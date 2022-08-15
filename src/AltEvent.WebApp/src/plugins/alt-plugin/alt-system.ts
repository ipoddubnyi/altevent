// import { IServiceFactory, IUseCaseFactory } from "@lib";
// import { ServiceFactory } from "@core/services/service.factory";
// import { UseCaseFactory } from "@core/usecases/usecase.factory";
// import { TokenService } from "@core/security/token.service";
// import { QueryConverter } from "./queryConverter";

// export class AltSystem {
//     private readonly _factory: IServiceFactory;
//     private readonly _usecase: IUseCaseFactory;
//     private readonly _token: TokenService;
//     private readonly _query: QueryConverter;

//     public constructor() {
//         this._factory = new ServiceFactory();
//         this._usecase = new UseCaseFactory();
//         this._token = new TokenService();
//         this._query = new QueryConverter();
//     }

//     /** Фабрика для создания сервисов. */
//     public get factory(): IServiceFactory {
//         return this._factory;
//     }

//     /** Фабрика для создания вариантов использования. */
//     public get usecase(): IUseCaseFactory {
//         return this._usecase;
//     }

//     /** Сервис для работы с токенами. */
//     public get token(): TokenService {
//         return this._token;
//     }

//     /** Работа с запросами. */
//     public get query(): QueryConverter {
//         return this._query;
//     }
// }
