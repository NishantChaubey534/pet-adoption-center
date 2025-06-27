const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     responses:
 *       200:
 *         description: A list of pets
 */
router.get('/', petController.getPets);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single pet
 */
router.get('/:id', petController.getPet);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Add a new pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet created successfully
 */
router.post('/', petController.createPet);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Update a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet updated
 */
router.put('/:id', petController.updatePet);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pet deleted
 */
router.delete('/:id', petController.deletePet);

module.exports = router;
