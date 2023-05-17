"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformButton = void 0;
const output_1 = require("@jovotech/output");
const models_1 = require("../../models");
// import should not be shortened or decorator has problems with finding the correct enum
const Button_1 = require("../../models/button/Button");
function TransformButton() {
    return (0, output_1.Type)(() => Button_1.ButtonBase, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { value: models_1.CallButton, name: Button_1.ButtonType.Call },
                { value: models_1.GamePlayButton, name: Button_1.ButtonType.GamePlay },
                { value: models_1.UrlButton, name: Button_1.ButtonType.Url },
                { value: models_1.LogInButton, name: Button_1.ButtonType.LogIn },
                { value: models_1.LogOutButton, name: Button_1.ButtonType.LogOut },
                { value: models_1.PostbackButton, name: Button_1.ButtonType.Postback },
            ],
        },
    });
}
exports.TransformButton = TransformButton;
//# sourceMappingURL=TransformButton.js.map