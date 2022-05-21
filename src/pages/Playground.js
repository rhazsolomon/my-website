
import { async } from '@firebase/util'
import { useEffect, useState } from 'react'
import { addUser, createNewUserWithDefaults, dbSet } from '../database/db'
import { addCategory } from '../database/db'

const Playground = () => {


    const doThing = () => {
        // addCategory('user_bdd2dfa4-dc50-4480-8780-9ae51d2b5941', 'music')
        // addUser("Ron", "ron@example.com")
        createNewUserWithDefaults("magnesium", "magnesium@example.com")
    }
    return (
        <div>

            <button onClick={doThing}>Do Thing</button>
        </div>
    )
}

export default Playground;