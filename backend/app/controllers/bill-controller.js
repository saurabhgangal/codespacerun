import * as billService from '../services/bill-service.js';
import { setErrorResponse, setResponse } from './response-handler.js';

/**
 * Controller function to handle generating a bill.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const generateBill = async (req, res) => {
    try {
        const { patientName, service, amount } = req.body;

        // Validating required fields
        if (!patientName || !service || !amount) {
            setErrorResponse({ message: 'Patient name, service, and amount are required' }, res, 400);
            return;
        }

        // Call the generate bill service
        const bill = await billService.generateBill({ patientName, service, amount });

        // Set a success response
        setResponse({ message: 'Bill generated successfully', bill }, res);
    } catch (error) {
        // Set an error response in case of an exception
        setErrorResponse(error, res);
    }
};

/**
 * Controller function to handle viewing a bill by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const viewBill = async (req, res) => {
    try {
        // Extract bill ID from the request parameters
        const billId = req.params.id;

        // Call the get bill service
        const bill = await billService.getBill(billId);

        // Set a success response
        setResponse(bill, res);
    } catch (error) {
        // Set an error response in case of an exception
        setErrorResponse(error, res);
    }
};

/**
 * Controller function to handle updating a bill by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const updateBill = async (req, res) => {
    try {
        // Extract bill ID and updated data from the request parameters and body
        const billId = req.params.id;
        const updatedBillData = req.body;

        // Call the update bill service
        const updatedBill = await billService.updateBill(billId, updatedBillData);

        // Set a success response
        setResponse(updatedBill, res);
    } catch (error) {
        // Set an error response in case of an exception
        setErrorResponse(error, res);
    }
};

/**
 * Controller function to handle deleting a bill by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const deleteBill = async (req, res) => {
    try {
        // Extract bill ID from the request parameters
        const billId = req.params.id;

        // Call the delete bill service
        await billService.deleteBill(billId);

        // Set a success response
        setResponse({ message: 'Bill deleted successfully' }, res);
    } catch (error) {
        // Set an error response in case of an exception
        setErrorResponse(error, res);
    }
};