// Create a Complete Data CRUD with JSON Server


const adminBtn = document.querySelectorAll('.adminBtn');


adminBtn.forEach((items) => {

    items.addEventListener('click', function(){

        adminBtn.forEach((item) => {
            item.classList.remove('active');
        });

        this.classList.add('active');
    
    });

});



const skillList = document.querySelector('#skillList')

let apiLoad = () => {

    axios.get('http://localhost:2020/devsSkills').then((skill) => {
        
        let skillApiList = '';

        skill.data.map((skillData) => {
            skillApiList += `<option value="${skillData.skill}">${skillData.skill}</option>`;
        });

        skillList.insertAdjacentHTML('beforeend', skillApiList);

    })

}

apiLoad();


const uploadDevsData = document.querySelector('#uploadDevsData')

const getDevelopers = () => {

    axios.get('http://localhost:2020/devs').then((response) => {

        let devsData = '';

        response.data.map((devsDataItem) => {

            devsData += `
                <tr>
                    <td>${devsDataItem.id}</td>
                    <td>${devsDataItem.nam}</td>
                    <td>${devsDataItem.numb}</td>
                    <td>${devsDataItem.salary}</td>
                    <td><img src="${devsDataItem.photo}" alt=""></td>
                    <td> 
                        <a data-bs-toggle="modal" href="#myModalView">
                            <button class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>
                        </a> 
                        <a data-bs-toggle="modal" href="#myModalEdit">
                            <button class="btn btn-warning btn-sm"><i class="fas fa-user-edit"></i></button>
                        </a> 
                        <a data-bs-toggle="modal" href="#myModalDelete">
                            <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                        </a> 
                    </td>
                </tr>
            `;

        });

        uploadDevsData.innerHTML = devsData;

    })

}

getDevelopers();



const devsAddForm = document.querySelector('#devsAddForm');


devsAddForm.addEventListener('submit', function(event){

    event.preventDefault();

    let nam = this.querySelector('#nam');
    let age = this.querySelector('#age');
    let numb = this.querySelector('#numb');
    let mail = this.querySelector('#mail');
    let salary = this.querySelector('#salary');
    let location = this.querySelector('#location');
    let skillList = this.querySelector('#skillList');
    let photo = this.querySelector('#photo');

    if(nam.value == "" || age.value == ""|| numb.value == "" || mail.value == "" || salary.value == "" || location.value == "" || skillList.value == "" || photo.value == ""){

        alert('All fields are required!');

    }else{

        axios.post('http://localhost:2020/devs', {
            id : "",
            nam : nam.value,
            age : age.value,
            salary : salary.value,
            mail : mail.value,
            skillId : skillList.value,
            location : location.value,
            numb : numb.value,
            photo : photo.value
        }).then((res) => {

            getDevelopers();

            nam.value = '';
            age.value = '';
            salary.value = '';
            mail.value = '';
            skillList.value = '';
            location.value = '';
            numb.value = '';
            photo.value = '';

        });

        

    }

})




