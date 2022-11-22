import { faker } from '@faker-js/faker';
import moment from 'moment';

const createPanel = () => {
    const title = faker.lorem.lines(1);
    const date = moment(faker.date.past(), 'YYYYMMDD');
    const comments = faker.datatype.number(60);
    const shares = faker.datatype.number(30);
    const dateFormated = date.fromNow();

    return { title, detail: `${dateFormated} . ${comments} comments . ${shares} shares` }
};

const createTab = () => {
    const header = faker.lorem.word({ length: { min: 3, max: 16 } });
    return {
        id: faker.database.mongodbObjectId(),
        header,
        body: new Array(2).fill().map(() => createPanel()),
    }
}

export const createTabs = () => new Array(3).fill().map(() => createTab())