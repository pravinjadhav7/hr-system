import hrList from '../hr.json';

let InitialState = {
    hrList: hrList
}

function getInitialState() {
    if (localStorage.getItem("hrs")) {
        InitialState = JSON.parse(localStorage.getItem("hrs"))
    }
}


getInitialState();

const hrStore = (state = InitialState, action) => {
    const newState = { ...state };

    switch (action.type) {

        case 'DELETE':
            const list = state.hrList.filter((pk) => pk.id !== action.payload.id);
            newState.hrList = list;
            state = { ...newState }
            localStorage.setItem("hrs", JSON.stringify(state));
            return state;

        case 'ADD':
            const hrlist = action.payload;
            hrlist.id = newState.hrList[newState.hrList.length - 1].id + 1;
            newState.hrList.push(action.payload);
            state = { ...newState }
            localStorage.setItem("hrs", JSON.stringify(state))
            return state;

        case 'EDIT':
            var obj = action.payload;
            var objList = newState.hrList;
            for (var i = 0; i < objList.length; i++) {
                if (obj.id === objList.id) {
                    objList[i].employee.name = obj.employee.name;
                    objList[i].employee.department = obj.employee.department;
                    objList[i].employee.skills = obj.employee.skills;
                }
            }
            newState.hrList = objList;
            state = { ...newState }
            localStorage.setItem("hrs", JSON.stringify(state))
            return state;

        default:
            return state;
    }
}

export { hrStore, InitialState };