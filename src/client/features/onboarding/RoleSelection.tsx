import React from "react";


// TODO: add a route in server.
const RoleSelection:React.FC = () => {
    const [role, setRole] = React.useState<string | null>(null);

    return (<>
        <h1>Warning! </h1><h3>This is permanent. Choose carefully.</h3>
    <form>
        <select onChange={(e) => setRole(e.target.value)}>
            <option value={'student'}>Student</option>
            <option value={'service-provider'}>Service-Provider</option>
        </select>
        <button>Confirm</button>
    </form>
    </>)
};


export default RoleSelection;
