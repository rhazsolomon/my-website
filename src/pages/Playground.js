
import { createNewUserWithDefaults } from '../database/db'


const Playground = () => {


    const doThing = () => {
        createNewUserWithDefaults("magnesium", "magnesium@example.com")
    }
    return (
        <div>

            <button onClick={doThing}>Do Thing</button>
        </div>
    )
}

export default Playground;