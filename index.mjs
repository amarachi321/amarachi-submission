import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);

const accCreator = await stdlib.newTestAccount(startingBalance);
const players = await stdlib.newTestAccounts(10, startingBalance);

const ctcCreator = accCreator.contract(backend);
const accepted_list = []
const connect_acc = async (player) => {
    try {
        const who = players[player];
        const acc = who.getAddress()
        const ctc = who.contract(backend, ctcCreator.getInfo());
        await ctc.apis.Players.connect_acc();
        accepted_list.push(acc)
        console.log(`${acc} is among the first 5 and has successfully connected`);
    } catch (error) {
        console.log('You were not among the first five hence rejected');
    }

}

await Promise.all([
    ctcCreator.p.Creator({
        start: () => {
            console.log('Creator has opened connection')
        },
        amt_of_players: parseInt(5)
    }),
    await connect_acc(0),
    await connect_acc(1),
    await connect_acc(2),
    await connect_acc(3),
    await connect_acc(4),
    await connect_acc(5),
    await connect_acc(6),
    process.exit()
]);
