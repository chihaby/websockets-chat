const feathers = require ('@feathersjs/feathers');
const express = require ('@feathersjs/express');
const socketio = require ('@feathersjs/socketio');
const moment = require ('moment');

// Ideas Service
class IdeaSevice {
    constructor() {
        this.ideas = [];
    }

    async find() {
        return this.ideas;
    }

    async create(data) {{
        const idea = {
            id: this.ideas.length,
            text: data.text,
            tech: data.tech,
            viewer: data.viewer
        }

        idea.time = moment().format('h:mm:ss a');

        this.ideas.push(idea);
        return idea;
    }
}

const app = express(feathers());

// Parse JASON
app.use(express.json());

// Config Socket.io realtime APIs
app.configure(socketio());

// Enable REST sevices
app.configure(express.rest());

// Register services
app.use('/ideas', new IdeaSevice());

// New connections connect to stream channel
app.on('connection', conn => app.channel('stream').join(conn));

// Publish events to stream
app.publish(data => app.channel('stream'));

PORT = process.env.PORT || 3030;

app.listen(PORT).on('listening', ()=> console.log(`Realtime serv${PORT}`) );