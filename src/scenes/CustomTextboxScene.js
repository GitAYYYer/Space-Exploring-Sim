class CustomTextboxScene extends Phaser.Scene {
    customTextbox;
    contentText;
    zone;
    constructor() {
        super({key: 'CustomTextboxScene'});
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        this.setListeners();

        this.customTextbox = this.createTextbox(this.game.config.width / 2.7, this.game.config.height / 2, 600, 200, '6 bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh 1 bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruhbruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh bruh ');
    }

    setTextboxText(text) {
        this.contentText.setText(text);
    }

    setListeners() {
        this.emitter.on('writeToTextBox', this.setTextboxText.bind(this));
    }

    createTextbox(x, y, widthIn, heightIn, quote) {
        let width = widthIn;
        let height = heightIn;
        let padding = 10;

        let textbox = this.add.graphics({x: x, y: y});

        textbox.fillRect(0, 0, width, height);

        var mask = new Phaser.Display.Masks.GeometryMask(this, textbox);

        // textbox.fillStyle(0xffffff, 1);

        textbox.lineStyle(4, 0x00ff00);

        textbox.strokeRect(0, 0, width, height);
        textbox.fillRect(0, 0, width, height);

        this.contentText = this.add.text(0, 0, quote, {
            fontFamily: 'Arial',
            fontSize: 20,
            color: '#0f0    ',
            align: 'center',
            wordWrap: {width: width - (padding * 2)}
        });

        this.contentText.setMask(mask);

        let b = this.contentText.getBounds();

        this.contentText.setPosition(textbox.x + (width / 2) - (b.width / 2), textbox.y + (height / 2) - (b.height / 2));

        this.zone = this.add.zone(x, y, width, height).setOrigin(0).setInteractive();

        this.controlScroll(b, textbox, height);

        return textbox;
    }

    //adds and controls the scroll on the textbox
    controlScroll(b, textbox, height) {
        let contentText1 = this.contentText;
        this.zone.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

            contentText1.y -= (deltaX * 0.2);
            //limits the scrolling to around the content
            contentText1.y = Phaser.Math.Clamp(contentText1.y, 670 - b.height, b.height / 2 + textbox.y + (height / 2) - (b.height / 2));
        });

        //try to reset scroll to top on new message
        contentText1.y = (b.height / 2 + textbox.y + (height / 2) - (b.height / 2));

        //for mouse dragging
        // zone.on('pointermove', function (pointer) {
        //
        //     if (pointer.isDown)
        //     {
        //         content.y += (pointer.velocity.y / 10);
        //         console.log(content.y)
        //         // content.y = Phaser.Math.Clamp(content.y, 0, 0);
        //     }
        //
        // });
    }
}