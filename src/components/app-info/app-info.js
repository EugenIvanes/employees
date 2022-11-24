import './app-info.css';

const AppInfo = (props) => {
    const {employeesLenght, employeesIncrease} = props;
    return(
        <div className="app-info">
            <h1>Учет сотрудников в компании Name</h1>
            <h2>Обшее число сотрудников: {employeesLenght}</h2>
            <h2>Премию получат: {employeesIncrease}</h2>
        </div>
    );
};

export default AppInfo;