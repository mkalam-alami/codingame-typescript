import { sayHello } from "./utils";

while (true) {
    const line = readline();
    const output = sayHello(line);
    console.log(output);
}
