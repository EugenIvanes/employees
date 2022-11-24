import './app.css';
import { Component } from "react";
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../emplyees-add-form/employees-add-form';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                    {name: 'Eugen I.', salary:800, increase:false, rise:false, id: 0},
                    {name: 'Alex D.', salary: 300, increase:false, rise:false, id: 1},
                    {name: 'Ilie F.', salary: 5000, increase:false, rise:false, id: 2}
                ],
            term: '',
            filter:'all'
        };
    }

    deleteItem = (id) => {
        this.setState(({data})=>{
          return {
            data: data.filter(item => item.id !== id)
          }
        })
    };

    onChengeSalary = (id, salary) => {
        this.setState(({data})=>(
            {
                data:data.map(item => {
                    if(item.id === id){
                        return{...item, salary: +salary.slice(0,-1)}
                    }
                    return item;
                })
            }
        ));
    };

    addItem = (name, salary, id) => {
       const newItem = {
            name,
            salary,
            incrise:false, 
            like:false,
            id
       }
       this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {data: newArr};
       });
    };

    onToggleProp = (id, prop) => {
        // this.setState(({data})=>{
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, incrise: !old.incrise};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return{
        //         data: newArr
        //     }
        // });
        this.setState(({data})=>(
            {
                data:data.map(item => {
                    if(item.id === id){
                        return{...item, [prop]: !item[prop]}
                    }
                    return item;
                })
            }
        ));
    };

    filterPost = (items, filter) => {
        switch(filter){
            case 'rise':{
                return items.filter(item => item.rise)
            }
            case 'moreThen1000':{
                return items.filter(item => item.salary > 1000)
            }
            default:
                return items
        }
    }

    searchEmp = (items, term) => {
        if(term.length === 0) return items
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    };

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onFilterSelect = (filter) =>{
        this.setState({filter});
    }

    render(){
        const {data, term, filter} = this.state;
        const employeesLenght= data.length;
        const employeesincrease= data.filter(item => item.increase).length;
        const visibleData = this.searchEmp(this.filterPost(data, filter), term);
        return(
            <div className="app">
                <AppInfo employeesLenght={employeesLenght} employeesIncrease={employeesincrease}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                onChengeSalary={this.onChengeSalary}/>
                <EmployeesAddForm
                onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;