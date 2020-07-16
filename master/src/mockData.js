const config = require('../../server/dev.config');
export const appConfig = [
  {
    id: "1",
    title: "A应用",
    module: "subapp-a",
    defaultRegister: true,
    entry: `//localhost:${config.ports['subapp_a_port']}`,
    routerBase: "/a",
    children: [
      {
        id: "1-1",
        title: "A的首页",
        url: "/a"
      },
      {
        id: "1-2",
        title: "A的信息",
        url: "/a/info"
      },
      {
        id: "1-3",
        title: "A的信息",
        url: "/a/detail"
      }
    ]
  },
  {
    id: "2",
    title: "B应用",
    module: "subapp-b",
    defaultRegister: false,
    entry: `//localhost:${config.ports['subapp_b_port']}`,
    routerBase: "/b",
    children: [
      {
        id: "2-1",
        title: "B的首页",
        url: "/b"
      },
      {
        id: "2-2",
        title: "B的信息",
        url: "/b/info"
      },
      {
        id: "2-3",
        title: "B的详情",
        url: "/b/detail"
      }
    ]
  },
  {
    id: "3",
    title: "React应用",
    module: "subapp-c",
    defaultRegister: false,
    entry: `//localhost:${config.ports['subapp_c_port']}`,
    routerBase: "/c",
    children: [
      {
        id: "3-1",
        title: "C的首页",
        url: "/c"
      },
      {
        id: "3-2",
        title: "C的信息",
        url: "/c/info"
      },
      {
        id: "3-3",
        title: "C的详情",
        url: "/c/detail"
      }
    ]
  },
]
