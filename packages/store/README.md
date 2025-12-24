# store

示例实例数据子项目（已重命名为 `store`），用于存放 `@ourtime/datatypes` 的示例对象（World, Timeline, Who, Location, Event 等）。

改动：已加入 `keyv` 与 `keyv-browser` 作为依赖，便于将来将示例数据持久化到 Keyv 支持的存储后端。

用法：在 monorepo 中可通过 `import { worlds, timelines, whos, events } from '@ourtime/store'` 引入。

构建：
```
cd packages/store
npm run build
```
