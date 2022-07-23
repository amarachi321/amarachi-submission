'reach 0.1'
export const main = Reach.App(() => {
    const Creator = Participant('Creator', {
        start: Fun([], Null),
        amt_of_players: UInt
    })
    const Players = API('Players', {
        connect_acc: Fun([], UInt)
    })
    init()

    Creator.only(() => {
        interact.start()
        const number = declassify(interact.amt_of_players)
    })
    const initial_count = 0
    Creator.publish(number)

    const [count] =
        parallelReduce([initial_count])
            .invariant(balance() == 0)
            .while(count < number)
            .api(Players.connect_acc,
                (k) => {
                    k(count);
                    return [count + 1];
                })

    commit()
    exit()
})
