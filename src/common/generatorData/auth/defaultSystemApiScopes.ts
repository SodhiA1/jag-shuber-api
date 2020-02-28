import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export const defaultSystemApiScopes = [
    {
        roleCode: 'SETUP',
        scopeCode: 'users:manage', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SETUP',
        scopeCode: 'roles:manage', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SETUP',
        scopeCode: 'sheriffs:manage', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SETUP',
        scopeCode: 'system:scopes', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SETUP',
        scopeCode: 'system:types', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:scopes:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:types:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
