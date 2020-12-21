const { dialog } = require('electron');
const { Extension, log, INPUT_METHOD, PLATFORMS } = require('deckboard-kit');

class Test extends Extension {
    constructor() {
        super();
        this.name = "Test";
        this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
        this.inputs = [
            {
                label: "Test Label",
                value: "test-value",
                icon: "power-off",
                color: '#34495e',
                input: [
                    {
                        label: "Action1",
                        ref: "testAction",
                        type: INPUT_METHOD.INPUT_SELECT,
                        items: [
                            {
                                label: "Test1",
                                value: "test-one"
                            },
                            {
                                label: "Test2",
                                value: "test-two"
                            }
                        ]
                    },
                    {
                        label: "With confirmation",
                        ref: "confirmation",
                        type: INPUT_METHOD.INPUT_CHECKBOX,
                        default: true
                    }
                ]
          }
        ];
    }

    execute(action, { testAction, confirmation = true}) {
        log.info('${action} ${testAction}');
        switch(action) {
            case "test-value": {
                switch(testAction) {
                    case "test-one":
                        if(confirmation)
                            dialog.showMessageBox(
                                null,
                                {
                                    type: "question",
                                    buttons: ["Cancle", "Yes"],
                                    defaultId: 0,
                                    title: "TestTitle",
                                    message:
                                        "Test?"
                                },
                                response => {
                                    if(response === 1) log.info("TEST YES");
                                }
                            );
                        else log.info("ELSE");
                        break;
                    case "test-two":
                        if(confirmation)
                            dialog.showMessageBox(
                                null,
                                {
                                    type: "question",
                                    buttons: ["Cancle2", "Yes2"],
                                    defaultId: 0,
                                    title: "TestTitle2",
                                    message:
                                        "Test2?"
                                },
                                response => {
                                    if(response === 1) log.info("TEST YES2");
                                }
                            );
                        else log.info("ELSE2");
                        break;
                }
            }
            default:
                    break;
        }
    }

}

module.exports = new Test();