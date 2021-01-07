//from https://gist.github.com/blixt/f17b47c62508be59987b

// NOTICE 2020-04-18
// Please see the comments below about why this is not a great PRNG.

// Read summary by @bryc here:
// https://github.com/bryc/code/blob/master/jshash/PRNGs.md

// Have a look at js-arbit which uses Alea:
// https://github.com/blixt/js-arbit

//NOTE: Regarding above, this generator is fine for our needs. if we encounter issues we will try a different one but for now it's fine.

/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
function Random(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
    //burner
    this.next();
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
Random.prototype.next = function () {
    return this._seed = this._seed * 16807 % 2147483647;
};


/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
    // We know that result of next() will be 1 to 2147483646 (inclusive).
    return (this.next() - 1) / 2147483646;
};