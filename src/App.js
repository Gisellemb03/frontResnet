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
      <form class="form-horizontal" >  
      <div class="input-group">
        <input onChange={handleImageAsFile} type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
        <button onClick={handleSubmit} class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Enviar</button>
        </div>
        </form>
        {imageUrl ? (
          <div class="card mb-3">
          <img src={ imageUrl} class="card-img-top" alt="Foto mascota" style={{maxHeight:"400px", maxWidth:"600px"}}/>
        <div class="card-body">
              <h3 class="card-title">Nombre: {imageName}</h3>
              <h5 class="card-title">Clase: { imageClass}</h5>
          <p class="card-text">Imagen detectada con RESTNET API</p>
          
        </div>
</div>
        ):(<div>No se a seleccionado la imagen</div>)}
      
      </header>
    </div>
  );
}

export default App;
