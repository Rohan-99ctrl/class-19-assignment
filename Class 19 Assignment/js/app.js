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

    axios.get('http://localhost:2020/devs').then((skill) => {
        
        let skillApiList = '';

        skill.data.map((skillData) => {
            skillApiList += `<option value="${skillData.skillId}">${skillData.skillId}</option>`;
        });

        skillList.insertAdjacentHTML('beforeend', skillApiList);

    })

}

apiLoad();


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
        });

    }

})





