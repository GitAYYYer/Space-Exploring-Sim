function GenerateGalaxy() {
    let r = new Random(1);
    for (let i = 0; i < Config.Galaxy.numberOfSystems; i++) {
        CurrentGalaxy.push(Math.floor(r.next()));
    }

    GenerateSolarSystem(CurrentGalaxy[Math.random() * CurrentGalaxy.length])
    // GenerateSolarSystem(CurrentGalaxy[100]);
}