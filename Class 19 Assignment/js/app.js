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
                    <td>$${devsDataItem.salary}</td>
                    <td><img src="${devsDataItem.photo}" alt=""></td>
                    <td> 
                        <a id="view" onclick="viewDeveloperDetails(${devsDataItem.id})" data-bs-toggle="modal" href="#myModalView">
                            <button class="btn btn-info btn-sm"><i class="fas fa-eye"></i></button>
                        </a> 
                        <a id="edit" onclick="viewDeveloperedit(${devsDataItem.id})" data-bs-toggle="modal" href="#myModalEdit">
                            <button class="btn btn-warning btn-sm"><i class="fas fa-user-edit"></i></button>
                        </a> 
                        <a id="delete" onclick="viewDeveloperDelete(${devsDataItem.id})" data-bs-toggle="modal" href="#myModalDelete">
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



// view data

const uploadDevsDataDetails = document.querySelector('#uploadDevsDataDetails');

function viewDeveloperDetails(id){

    axios.get(`http://localhost:2020/devs/${id}`).then((response) => {

        uploadDevsDataDetails.innerHTML = `
            <div class="detailWrapper mb-4 mt-2">
                <div class="row">
                    <div class="col-md-5 imageWrapper">
                        <img style="padding: 8px; background-color: rgb(41, 41, 41);width: 250px;height: 300px;object-fit: cover;" src="${response.data.photo}" alt="">
                    </div>

                    <div class="col-md-7 detailContent">
                        <h4><span style="color: blueviolet;">Name :</span> ${response.data.nam}</h4>
                        <h4><span style="color: blueviolet;">Age :</span> ${response.data.age}</h4>
                        <h4><span style="color: blueviolet;">Location :</span> ${response.data.location}</h4>
                        <h4><span style="color: blueviolet;">Contact No. :</span> ${response.data.numb}</h4>
                        <h4><span style="color: blueviolet;">E-mail :</span> ${response.data.mail}</h4>
                        <h4><span style="color: blueviolet;">Skill :</span> ${response.data.skillId}</h4>
                        <h4><span style="color: blueviolet;">Salary :</span> $${response.data.salary}</h4>
                    </div>
                </div>
            </div>
        `;

    })
}


// edit data 






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






