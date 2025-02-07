import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { useToast } from "./components/hooks/use-toast";

export default function App() {
    const { toast } = useToast();

    const onClick = () => {
        window.ipcRenderer.invoke("custom-event");
    };

    useEffect(() => {
        type ElectronListener = Parameters<Electron.IpcRenderer["on"]>[1];

        const listener: ElectronListener = (_event, message) => {
            toast({
                title: "Message",
                description: message,
            });
        };

        window.ipcRenderer.on("my-event", listener);

        return () => {
            window.ipcRenderer.off("my-event", listener);
        };
    }, []);

    return (
        <main className="flex place-items-center min-h-screen w-screen">
            <div className="rounded-lg mx-auto flex flex-col space-y-6">
                <h1 className="font-extrabold text-2xl text-center">Electron Template</h1>

                <img width={150} className="mx-auto" src="/favicon.ico" />

                <div className="mx-auto">
                    <Button onClick={onClick}>Send message to backend</Button>
                </div>
            </div>
        </main>
    );
}
