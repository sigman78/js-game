import path from "path";
import webpack from "webpack";
import Spritesmith from "webpack-spritesmith";
import TexturePacker from "spritesmith-texturepacker";

export default {

    entry: ["babel-polyfill", "./src/index.js"],

    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "game.js"
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new Spritesmith({
            src: {
                cwd: path.resolve(__dirname, "../src/sprites"),
                glob: "*.png"
            },
            target: {
                image: path.resolve(__dirname, '../static/assets/sprites.png'),
                css: [[path.resolve(__dirname, '../static/assets/sprites.json'), {format: 'atlas'}]]
            },
            customTemplates: {
                'atlas': TexturePacker
            },
            apiOptions: {
                cssImageRef: "sprites.png"
            }            
        })
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "../src")
            ],
            loader: "babel-loader",
        }]
    },

    resolve: {
        root: [ path.resolve(__dirname, "../src") ],
        extensions: [".js", ""]
    },

    stats: {
        colors: true,
        chunks: false
    }
};
