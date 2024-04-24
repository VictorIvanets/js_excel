console.log('Module');


class App {



async asyncTestMovie() {
    const app = document.getElementById('app')
    const newDiv = document.createElement('div');
    app.append(newDiv)

    let dataset 
        await fetch('https://www.omdbapi.com/?apikey=12ea9b88&s=movies&page=1')
        .then(response => response.json())
        .then(data => dataset = data.Search)
        .catch((e)=> console.log(e))
        dataset.map(i=>{
            newDiv.insertAdjacentHTML('afterend', `<h1> Movie: ${i.Title} <h1/>`)
        })

}
    

render(){
    const app = document.getElementById('app')

    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div> 
    
    <h1> Привет! ${this.a+this.b}<h1/>
    <h1> Привет web pack </h1>
    <h1> Starting </h1>
    <button class ="button"> add  </button>
    </div>`;

    app.append(newDiv)
    this.renderbtn()
}

render2(){
    
}

renderbtn(){
    const btn = document.querySelector('.button')
    btn.addEventListener('click', (e)=>{
    e.preventDefault()
    this.asyncTestMovie()})
}


}


const obgTest = new App()
obgTest.render()

