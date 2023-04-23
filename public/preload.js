const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    getData: () => ipcRenderer.invoke("get-data").then(res => JSON.parse(res)),
    setData: data => ipcRenderer.send("set-data", data),
});