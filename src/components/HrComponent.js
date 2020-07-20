import React from 'react';
import HrContext from '../utils/context';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const HrComponent = () => {

    const [store, hrDispatch] = React.useContext(HrContext);
    const [employee, setEmployee] = React.useState({
        id: -1,
        employee: {
            name: '',
            department: '',
            skills: ''
        }
    });
    const [addModal, setAddModal] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const toggleAdd = () => {
        var emp = {
            id: -1,
            employee: {
                name: '',
                department: '',
                skills: ''
            }
        }
        setEmployee(emp);
        setAddModal(!addModal);
    }


    const onChangeInputs = (event) => {
        if (event.target.name === "name") {
            employee.employee.name = event.target.value;

        } else if (event.target.name === "department") {
            employee.employee.department = event.target.value;

        } else {
            employee.employee.skills = event.target.value;
        }

        setEmployee({ ...employee })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (employee.id === -1) {
            hrDispatch({ type: 'ADD', payload: employee });
        } else {
            hrDispatch({ type: 'EDIT', payload: employee });
        }
        setAddModal(!addModal)
    }

    const onSearchChange = (e) => {
        var obj = e.target.value;
        setSearch(obj)
    }

    return (<React.Fragment>
        <div className='main-content mt-6'>
            <div className='container mt-n6'>
                <div className='row'>
                    <div className='col'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='card-header-title h3'>Welcome To Replicon HR System</div>
                            </div>
                            <div className='card-header'>
                                <div class="col-md-6">
                                    <form>
                                        <div class="input-group input-group-lg input-group-merge">
                                            <input type="text" class="form-control form-control-prepended list-search border-0" placeholder="Search" value={search} onChange={onSearchChange} />
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0">
                                                    <span class="fa fa-search"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='card-body'>
                                <div className='table-responsive mb-0'>
                                    <table className='table table-sm table-nowrap table-hover card-table text-left'>
                                        <thead>
                                            <tr>
                                                <th>Employee Name</th>
                                                <th>Department</th>
                                                <th>Skills</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='list'>
                                            {
                                                store.hrList.filter(name => name.employee.name.includes(search)).map((hr) => {
                                                    return (
                                                        <tr key={hr.id}>
                                                            <td>
                                                                {hr.employee.name}
                                                            </td>
                                                            <td>
                                                                {hr.employee.department}
                                                            </td>
                                                            <td>
                                                                {hr.employee.skills}
                                                            </td>
                                                            <td>
                                                                <span className='ml-2' style={{ cursor: 'pointer' }} onClick={() => {
                                                                    setEmployee(hr);
                                                                    setAddModal(!addModal);
                                                                }}>
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                </span>
                                                                <span className='ml-3' style={{ cursor: 'pointer' }} onClick={() => hrDispatch({ type: "DELETE", payload: hr })}>
                                                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='card-footer text-left'>
                                <button className='btn btn-outline-success mb-2' onClick={toggleAdd}> Add Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpen={addModal} toggle={toggleAdd}>
            <ModalHeader toggle={toggleAdd}>Add/Edit Employee</ModalHeader>
            <ModalBody>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="name">Employee Name</label>
                        <input type="text" className="form-control" id="name" placeholder="eg. Jhon Doe" name='name' value={employee.employee.name} onChange={(e) => { onChangeInputs(e) }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Department</label>
                        <input type="dept" className="form-control" id="dept" placeholder="eg. Engineering" name='department' value={employee.employee.department} onChange={(e) => { onChangeInputs(e) }} />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="skills">Skills</label>
                        <input type="text" className="form-control" id="skills" placeholder="eg. Python, Node" name='skills' value={employee.employee.skills} onChange={(e) => { onChangeInputs(e) }} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-outline-success' onClick={handleSubmit}>Submit</button>
            </ModalFooter>
        </Modal>
    </React.Fragment>
    );
}

export default HrComponent;