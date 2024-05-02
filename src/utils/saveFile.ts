import fs from 'node:fs';
export const saveFile = async (f:any)=>{
    fs.writeFile(`log`,JSON.stringify(f),(err)=>{
        console.error(`Error saving data`,f)
    })
}