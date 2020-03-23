import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { FrontendScope } from '../../../models/FrontendScope';

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopes: FrontendScope[] = [
   /**
    * @scope SA_ALL_LOCATIONS
    */
    {
        scopeName: 'Special / Super Admin', // Human-friendly scope name
        scopeCode: 'SA_SPECIAL', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Special privileges for the Super Admin user',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Users Page', // Human-friendly scope name
        scopeCode: 'ADMIN_PAGE_USERS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin API Scopes Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Frontend Scopes Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Courtrooms Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_COURTROOMS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Court Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_COURT_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Jail Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_JAIL_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Escort Runs Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_ESCORT_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Other Assignments Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_OTHER_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Leave Types Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_LEAVE_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Training Types Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_TRAINING_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Identification Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Leaves Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Location Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Roles Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Training Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
