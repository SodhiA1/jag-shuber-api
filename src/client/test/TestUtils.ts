import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';
import db from '../../db/Database';
import ExtendedClient from '../ExtendedClient';
import { Courthouse, Courtroom, Assignment, Region } from '../models';
import { Sheriff } from '../../models/Sheriff';
import { ClientBase } from 'pg';

expect.extend({
    toMatchShapeOf,
    toMatchOneOf
});


export default class TestUtils {
    public static tables = {
        sheriff_duty: 'sheriff_duty',
        duty: 'duty',
        duty_recurrence: 'duty_recurrence',
        assignment: 'assignment',
        courtroom: 'courtroom',
        run: 'run',
        shift: 'shift',
        sheriff: 'sheriff',
        courthouse: 'courthouse',
        region: 'region'
    }
    private static tablesToClear = [
        TestUtils.tables.sheriff_duty,
        TestUtils.tables.duty,
        TestUtils.tables.duty_recurrence,
        TestUtils.tables.assignment,
        TestUtils.tables.courtroom,
        TestUtils.tables.run,
        TestUtils.tables.shift,
        TestUtils.tables.sheriff,
        TestUtils.tables.courthouse,
        TestUtils.tables.region,
    ]
    constructor() {

    }

    static getClient(): ExtendedClient {
        return new ExtendedClient('http://localhost:3001/api/v1');
    }

    static async clearTable(client?: ClientBase, ...tables: string[]) {
        const dbClient = client ? client : await db.getClient();
        await Promise.all(tables.map(tn => dbClient.query(`DELETE FROM ${tn};`)));
    }

    static async clearDatabase() {
        await db.transaction(async (client) => {
            await TestUtils.tablesToClear.forEach(async (table) => {
                await TestUtils.clearTable(client, table);
            });
        })
    }

    static async closeDatabase() {
        await db.close();
    }

    static randomString(length: number) {
        let str = "";
        for (let i = 0; i < length; ++i) {
            str = `${str}${String.fromCharCode(65 + (Math.random() * 25))}`
        }
        return str;
    }

    static async newTestRegion(): Promise<Region> {
        const api = TestUtils.getClient();
        return await api.CreateRegion({
            name: "TEST Region",
            code: TestUtils.randomString(5)
        });
    }

    static async newTestCourthouse(regionId: string): Promise<Courthouse> {
        const api = TestUtils.getClient();
        return await api.CreateCourthouse({
            regionId,
            name: "TEST COURTHOUSE",
            code: TestUtils.randomString(5)
        });
    }

    static async newTestCourtroom(courthouseId: string): Promise<Courtroom> {
        const api = TestUtils.getClient();
        return await api.CreateCourtroom({
            name: "TEST COURTROOM",
            courthouseId,
            code: TestUtils.randomString(5)
        });
    }

    static async newTestAssignment(courthouseId, assignmentDetails: Partial<Assignment> = {}): Promise<Assignment> {
        const api = TestUtils.getClient();
        let workSectionId = "";
        if (assignmentDetails.jailRoleCode) {
            workSectionId = "JAIL";
        } else if (assignmentDetails.runId) {
            workSectionId = "ESCORTS";
        } else if (assignmentDetails.courtroomId) {
            workSectionId = "COURTS";
        } else if (assignmentDetails.otherAssignCode) {
            workSectionId = "OTHER";
        }
        return await api.CreateAssignment({
            ...assignmentDetails,
            workSectionId,
            courthouseId
        });
    }


    static async newTestSheriff(courthouseId: string, sheriff?: Partial<Sheriff>): Promise<Sheriff> {
        const api = TestUtils.getClient();
        return await api.CreateSheriff({
            badgeNo: TestUtils.randomString(5),
            firstName: 'Bill',
            lastName: 'Nye',
            rankCode: 'DEPUTYSHERIFF',
            homeCourthouseId: courthouseId
        }) as Sheriff;
    }

}

beforeAll(async (done) => {
    await TestUtils.clearDatabase();
    done();
});

afterAll(async () => {
    // Don't wait for the database to close, hoping it does
    TestUtils.closeDatabase();
});