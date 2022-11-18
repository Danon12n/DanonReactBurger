import { setCookie } from "../../utils/cookie";

const TestPage = function () {
    setCookie("test", "test2");
    setCookie("test", "test1");
    return <div>test</div>;
};
export { TestPage };
