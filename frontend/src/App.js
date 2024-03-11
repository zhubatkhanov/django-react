import './App.css';
import {Routes, Route} from 'react-router-dom' 
import Home from './components/Home';
import Animals from './components/Animals';
import AnimalTypes from './components/AnimalTypes';
import Breeds from './components/Breeds';
import CreateAnimal from './components/CreateAnimal';
import CreateType from './components/CreateType';
import EditType from './components/EditType';
import DeleteType from './components/DeleteType';
import CreateBreed from './components/CreateBreed';
import NavBar from './components/NavBar'
import EditBreed from './components/EditBreed';
import DeleteBreed from './components/DeleteBreed';
import EditAnimal from './components/EditAnimal';
import DeleteAnimal from './components/DeleteAnimal';
import Create from './components/Create';
import CreateWei from './components/CreateWei';
import Weightings from './components/Weightings'
import EditWei from './components/EditWei';
import DeleteWei from './components/DeleteWei';


function App() {
  const myWidth = 220
  return (
    <div className="App">
      <NavBar drawerWidth = {myWidth}
      content = {
        <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='/animals' element={<Animals/>}/>
        <Route path='/types' element={<AnimalTypes/>}/>
        <Route path='/breeds' element={<Breeds/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/weightings' element={<Weightings/>}/>

        <Route path='/createanimal' element={<CreateAnimal/>}/>
        <Route path='/editanimal/:id' element={<EditAnimal/>}/>
        <Route path='/deleteanimal/:id' element={<DeleteAnimal/>}/>

        <Route path='/createtype' element={<CreateType/>}/>
        <Route path='/edittype/:id' element={<EditType/>}/>
        <Route path='/deletetype/:id' element={<DeleteType/>}/>

        <Route path='/createbreed' element={<CreateBreed/>}/>
        <Route path='/editbreed/:id' element={<EditBreed/>}/>
        <Route path='/deletebreed/:id' element={<DeleteBreed/>}/>

        <Route path='/createwei' element={<CreateWei/>}/>
        <Route path='/editwei/:id' element={<EditWei/>}/>
        <Route path='/deletewei/:id' element={<DeleteWei/>}/>
        </Routes>
      }
      />
    </div>
  );
}

export default App;
