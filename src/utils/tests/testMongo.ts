import { Connection } from "../mongo";
import { expect } from 'chai';


describe('MongoConnection', function(){
    it('mongoTest#1', async function(){
        let connection;
        try {
            connection = await Connection.getInstance();
        } catch (err) {
            throw err;
        }

        expect(connection).to.be.an('object');
        expect(connection).to.not.be.null;
    });
});