import {Script} from "./script";

export class ScriptEntity {
    name: string;
    body: string;

    static toScript(scriptEntity: ScriptEntity): Script {
        let script: Script = new Script(scriptEntity.name, null);
        script.setScriptString(scriptEntity.body);
        return script;
    }
}