import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageName, setImageName] = useState('')
  const [imageClass, setImageClass] = useState('')

  const [imageUrl, setImageUrl] = useState('')
  const handleImageAsFile = (e) => {
       const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
  }

  async function handleSubmit() {
  

  const formParams = new FormData();
  formParams.append('file', imageAsFile)

    const response = await fetch("http://localhost:9000", {
      
      method: 'POST',
      headers: {
        
        'Access-Control-Allow-Origin' : '*'
      },
      body: formParams
    });
    const data = await response.json();
    console.log(data)
    setImageName(data.data.name_image);
    setImageUrl(data.data.url_image);
    setImageClass(data.data.class);
  
}

  


  return (
    <div className="App">
      <header className="App-header">
        <h1>API RESNET - Giselle Mendoza Barradas</h1>
        <p>La presente página realiza busqueda de tipos de animales</p>
        {imageUrl ? (
          <div class="card mb-3" style={{maxWidth:"800px"}}>
          <div class="row g-0">
            <div class="col-md-4">
              <img src={ imageUrl} class="img-fluid rounded-start" alt="..."/>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="titulo de la tarjeta">Nombre: {imageName}</h5>
                <h5 class="titulo de la tarjeta">Clase: {imageClass}</h5>
                <p class="card-text"> Animal Encontrado </p>
              </div>
            </div>
          </div>
        </div>
        ):(<div>Selecciona una imagen y enviala</div>)}
        <form class="form-horizontal" >  
      <div class="input-group">
        <input onChange={handleImageAsFile} type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
        <button onClick={handleSubmit} class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Enviar</button>
        </div>
        </form>
      
      </header>
    </div>
  );
}

export default App;
