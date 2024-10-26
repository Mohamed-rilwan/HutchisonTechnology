import { Router, Request, Response } from 'express';

const router = Router();
import fs from 'fs';
import path from 'path';

import { Dog } from '../../Backend/types';
import { subscribe } from 'diagnostics_channel';

const dogsDataFilePath = path.resolve(process.cwd(), 'data/dogs.json')

const readDogsData = (): Record<string, any> => {
    const data = fs.readFileSync(dogsDataFilePath, 'utf-8');
    return JSON.parse(data);
};

const updateDogsData = (data: Record<string, any>) => {
    fs.writeFileSync(dogsDataFilePath, JSON.stringify(data, null, 2));
};

/**
 * @swagger
 * /api/list:
 *   get:
 *     summary: Lists all available dog breeds and sub-breeds
 *     responses:
 *       200:
 *         description: A list of dogs
 */
router.get("/list", (_, res) => {
    let dogsList = readDogsData();
    console.log("dogslist", dogsList)
    res.json(dogsList);
})

/**
 * @swagger
 * /api/{breed}:
 *   put:
 *     summary: Add a sub-breed to an existing dog breed
 *     parameters:
 *       - name: breed
 *         in: path
 *         required: true
 *         description: The name of the dog breed to which you want to add a sub-breed
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *     responses:
 *       200:
 *         description: Sub-breed updated successfully
 *       404:
 *         description: Dog breed not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Server Error
 */

router.put('/:breed', (req: Request, res: Response) => {
    const breed = req.params.breed;
    const subbreed: string[] = req.body;
    console.log(breed, subbreed);
    let dogsList = readDogsData();
    if (!dogsList[breed]) {
        res.status(404).json({ message: "Dog breed not found" })
    }

    dogsList[breed] = [new Set([...dogsList[breed], ...subbreed])];
    updateDogsData(dogsList);

    res.status(200).json({
        message: 'Sub-breeds updated successfully',
        breed: breed,
        subbreed: dogsList[breed],
    });
})




/**
 * @swagger
 * /api/{breed}/{subbreed}:
 *   put:
 *     summary: Add a sub-breed to an existing dog breed
 *     parameters:
 *       - name: breed
 *         in: path
 *         required: true
 *         description: The name of the dog breed to which you want to add a sub-breed
 *         schema:
 *           type: string
 *       - name: subbreed
 *         in: path
 *         required: true
 *         description: The name of the subbreed
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated dog breed
 *       404:
 *         description: Not Found
 *       409:
 *         description: Conflicrt - subbreed already exists
 *       500:
 *         description: Server Error
 */
router.put('/:breed/:subbreed', (req: Request, res: Response) => {
    const { breed, subbreed } = req.params;
    console.log(breed, subbreed);
    let dogsList = readDogsData();
    if (!dogsList[breed.trim()]) {
        res.status(404).json({ message: "Dog breed not found" })
    }

    if (Array.isArray(dogsList[breed]) && dogsList[breed].includes(subbreed.trim())) {
        res.status(409).json({ message: "Dog breed already exists" })
    }
    dogsList[breed] = Array.from(new Set([...dogsList[breed], subbreed]));

    updateDogsData(dogsList);

    res.status(200).json({
        message: 'Sub-breeds added successfully',
        breed: breed,
        subbreed: dogsList[breed],
    });
})

/**
 * @swagger
 * /api/add/{breed}:
 *   post:
 *     summary: Add a new breed and sub-breeds of dog 
 *     parameters:
 *       - name: breed
 *         in: path
 *         required: true
 *         description: The name of the dog new breed 
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *     responses:
 *       200:
 *         description: Added dog breed and subbreed
 *       400:
 *         description:BadRequest, Correct type of sub breed  
 *       409:
 *         description: Conflict, Dog Breed already exists  
 *       500:
 *         description: Server Error
 */
router.post('/add/:breed', (req: Request, res: Response) => {
    const breed = req.params.breed;
    const subbreed = req.body;
    let dogsList = readDogsData();
    if (dogsList[breed]) {
        res.status(409).json({
            message: "Dog breed already exists",
        })
    }
    if (!Array.isArray(subbreed) || !subbreed.every(item => typeof item === 'string')) {
        res.status(400).json({ message: "Invalid sub breed types" })
    }
    else {
        dogsList[breed.trim()] = subbreed
        updateDogsData(dogsList);
        res.status(200).json({
            message: 'Dog Breed added successfully',
            breed: breed,
            subbreed: dogsList[breed],
        })
    }
})

export default router;