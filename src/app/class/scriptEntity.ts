import {Script} from "./script";

export class ScriptEntity {
    name: string;
    owner: string;
    body: string;

    static toScript(scriptEntity: ScriptEntity): Script {
        let script: Script = new Script(scriptEntity.name, scriptEntity.owner, null);
        script.setScriptString(scriptEntity.body);
        return script;
    }
}