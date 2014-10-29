module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/lib/phaser/build/phaser.js',
      'app/js/states/**/*.js',
      'app/js/game.js',
      'app/js/objects/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};