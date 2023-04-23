type Data = import("./src/types/Data").Data;

interface Window {
    electronAPI: {
        getData(): Promise<Data>;
        setData(data: Data): void;
    }
}