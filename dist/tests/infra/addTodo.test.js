"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerSource_1 = require("../../infra/helpers/server/ServerSource");
const ServerServiceImpl_1 = require("../../infra/services/server/ServerServiceImpl");
const supertest_1 = __importDefault(require("supertest"));
const UseCaseServiceImpl_1 = require("../../domain/services/UseCaseServiceImpl");
const BeforeTest_1 = require("./utilities/BeforeTest");
describe('AddTodo', () => {
    // Server Express
    const app = ServerServiceImpl_1.ServerServiceImpl.setServer(ServerSource_1.ServerSource.express);
    // Path
    const path = '/api/v1/todo';
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield BeforeTest_1.BeforeTest.resetParameter();
    }));
    // Ajout d'une todo
    it('Should add a new todo', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post(path)
            .set('Accept', 'application/json')
            .send({
            title: 'mon titre',
            description: 'ma description'
        });
        // Récupération des Todos
        const todos = yield UseCaseServiceImpl_1.UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
        expect(res.body).toHaveProperty('todo');
        expect(res.statusCode).toBe(201);
        expect(todos.length).toBe(3);
        expect(todos[2].id).toBe("3");
        expect(todos[2].title).toBe('mon titre');
    }));
    // Ajout d'un todo sans description
    it('Should add a new Todo with an empty description', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post(path)
            .set('Accept', 'application/json')
            .send({
            title: 'mon titre'
        });
        // Récupération des Todos
        const todos = yield UseCaseServiceImpl_1.UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
        expect(todos.length).toBe(3);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('todo');
        expect(res.body.todo.title).toBe('mon titre');
        expect(todos[2].title).toBe('mon titre');
        expect(todos[2].description).toBe('');
    }));
    // Echec d'ajout car pas de titre
    it('should throw InvalidTodoTitleException because title is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post(path)
            .set('Accept', 'application/json')
            .send({
            description: 'ma description'
        });
        // Récupération des Todos
        const todos = yield UseCaseServiceImpl_1.UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
        expect(res.body).toHaveProperty('errorMessage');
        expect(res.body.errorMessage).toBe('title is mandatory');
        expect(res.statusCode).toBe(400);
        expect(todos.length).toBe(2);
    }));
    // Ajout todo sans description
    it('Should add a todo with an empty description', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post(path)
            .set('Accept', 'application/json')
            .send({
            title: 'mon titre'
        });
        // Récupération des Todos
        const todos = yield UseCaseServiceImpl_1.UseCaseServiceImpl.getUseCases().findAllToDoUseCase.execute();
        expect(res.body).toHaveProperty('todo');
        expect(res.statusCode).toBe(201);
        expect(res.body.todo).toHaveProperty('title');
        expect(res.body.todo.title).toBe('mon titre');
        expect(todos.length).toBe(3);
        expect(todos[2].title).toBe('mon titre');
        expect(todos[2].description).toBe('');
    }));
});