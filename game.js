function update() {
    this.text.setText(Counter);
}

function listener (pointer, gameObject) {
    console.log(`You clicked on ${JSON.stringify(gameObject,null,2)}`);

    if (ClickReady && gameObject.name == 'button') {
        Counter++;
        gameObject.angle += 10;

        ClickReady = false;
        var progress = 0;
        var myVar = setInterval(function () {
            ProgressBar.fillRect(250, 280, progress, 30);
            progress += 1;

            if (progress == 380) {
                clearInterval(myVar);
                ProgressBar.clear();
                ClickReady = true;
            }
        }, 10)
    }
}

export { update, listener };