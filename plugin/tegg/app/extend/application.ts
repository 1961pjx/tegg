import {
  EggPrototype,
  EggPrototypeCreatorFactory,
  EggPrototypeFactory,
  EggPrototypeLifecycleUtil,
  LoadUnitFactory,
  LoadUnitLifecycleUtil,
} from '@eggjs/tegg-metadata';
import {
  AbstractEggContext,
  EggContainerFactory,
  EggObjectFactory,
  LoadUnitInstanceFactory,
  EggContextLifecycleUtil,
  EggObjectLifecycleUtil,
  LoadUnitInstanceLifecycleUtil,
} from '@eggjs/tegg-runtime';
import { LoaderFactory } from '@eggjs/tegg-loader';
import { EggProtoImplClass, PrototypeUtil, IdenticalUtil, RuntimeConfig } from '@eggjs/tegg';
import type { Application } from 'egg';

export default {
  // @eggjs/tegg-metadata should not depend by other egg plugins.
  // May make multi singleton instances.
  // So tegg-compatible should delegate the metadata factories
  // TODO delegate all the singleton
  get eggPrototypeCreatorFactory() {
    return EggPrototypeCreatorFactory;
  },
  get eggPrototypeFactory() {
    return EggPrototypeFactory.instance;
  },

  get loadUnitLifecycleUtil() {
    return LoadUnitLifecycleUtil;
  },

  get loadUnitFactory() {
    return LoadUnitFactory;
  },

  get eggObjectFactory() {
    return EggObjectFactory;
  },

  get loadUnitInstanceFactory() {
    return LoadUnitInstanceFactory;
  },

  get loadUnitInstanceLifecycleUtil() {
    return LoadUnitInstanceLifecycleUtil;
  },

  get eggContainerFactory() {
    return EggContainerFactory;
  },

  get loaderFactory() {
    return LoaderFactory;
  },

  get eggPrototypeLifecycleUtil() {
    return EggPrototypeLifecycleUtil;
  },

  get eggContextLifecycleUtil() {
    return EggContextLifecycleUtil;
  },

  get eggObjectLifecycleUtil() {
    return EggObjectLifecycleUtil;
  },

  get abstractEggContext() {
    return AbstractEggContext;
  },

  get identicalUtil() {
    return IdenticalUtil;
  },

  get runtimeConfig(): RuntimeConfig {
    const app = this as unknown as Application;
    const config = app.config;
    return {
      baseDir: config.baseDir,
      env: config.env,
      name: config.name,
    };
  },

  async getEggObject(clazz: EggProtoImplClass) {
    const proto = PrototypeUtil.getClazzProto(clazz);
    if (!proto) {
      throw new Error(`can not get proto for clazz ${clazz.name}`);
    }
    const eggObject = await EggContainerFactory.getOrCreateEggObject(proto as EggPrototype);
    return eggObject.obj;
  },
};
