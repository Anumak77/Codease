import { useState, useEffect } from 'react';
import Editor from './editor';
import { newPage } from '../scripts/saveLoad';

function HomePage({setComponent}) {
    return (
        <div id="HomePage">
            <button onClick={()=>{
                setComponent(<Editor setComponent={setComponent}/>);
                newPage();
            }}>Editor</button>
        </div>
    )
}
export default HomePage;