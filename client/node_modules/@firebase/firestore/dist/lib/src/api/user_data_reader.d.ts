/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as firestore from '@firebase/firestore-types';
import * as api from '../protos/firestore_proto_api';
import { DatabaseId } from '../core/database_info';
import { DocumentKey } from '../model/document_key';
import { FieldMask, FieldTransform, Mutation, Precondition } from '../model/mutation';
import { FieldPath } from '../model/path';
import { ObjectValue } from '../model/object_value';
import { JsonProtoSerializer } from '../remote/serializer';
import { FieldPath as ExternalFieldPath } from './field_path';
/** The result of parsing document data (e.g. for a setData call). */
export declare class ParsedSetData {
    readonly data: ObjectValue;
    readonly fieldMask: FieldMask | null;
    readonly fieldTransforms: FieldTransform[];
    constructor(data: ObjectValue, fieldMask: FieldMask | null, fieldTransforms: FieldTransform[]);
    toMutations(key: DocumentKey, precondition: Precondition): Mutation[];
}
/** The result of parsing "update" data (i.e. for an updateData call). */
export declare class ParsedUpdateData {
    readonly data: ObjectValue;
    readonly fieldMask: FieldMask;
    readonly fieldTransforms: FieldTransform[];
    constructor(data: ObjectValue, fieldMask: FieldMask, fieldTransforms: FieldTransform[]);
    toMutations(key: DocumentKey, precondition: Precondition): Mutation[];
}
export declare const enum UserDataSource {
    Set = 0,
    Update = 1,
    MergeSet = 2,
    /**
     * Indicates the source is a where clause, cursor bound, arrayUnion()
     * element, etc. Of note, isWrite(source) will return false.
     */
    Argument = 3,
    /**
     * Indicates that the source is an Argument that may directly contain nested
     * arrays (e.g. the operand of an `in` query).
     */
    ArrayArgument = 4
}
/** Contains the settings that are mutated as we parse user data. */
interface ContextSettings {
    /** Indicates what kind of API method this data came from. */
    readonly dataSource: UserDataSource;
    /** The name of the method the user called to create the ParseContext. */
    readonly methodName: string;
    /**
     * A path within the object being parsed. This could be an empty path (in
     * which case the context represents the root of the data being parsed), or a
     * nonempty path (indicating the context represents a nested location within
     * the data).
     */
    readonly path?: FieldPath;
    /**
     * Whether or not this context corresponds to an element of an array.
     * If not set, elements are treated as if they were outside of arrays.
     */
    readonly arrayElement?: boolean;
}
/** A "context" object passed around while parsing user data. */
export declare class ParseContext {
    readonly settings: ContextSettings;
    readonly databaseId: DatabaseId;
    readonly serializer: JsonProtoSerializer;
    readonly fieldTransforms: FieldTransform[];
    readonly fieldMask: FieldPath[];
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings The settings for the parser.
     * @param databaseId The database ID of the Firestore instance.
     * @param serializer The serializer to use to generate the Value proto.
     * @param fieldTransforms A mutable list of field transforms encountered while
     *     parsing the data.
     * @param fieldMask A mutable list of field paths encountered while parsing
     *     the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    constructor(settings: ContextSettings, databaseId: DatabaseId, serializer: JsonProtoSerializer, fieldTransforms?: FieldTransform[], fieldMask?: FieldPath[]);
    get path(): FieldPath | undefined;
    get dataSource(): UserDataSource;
    /** Returns a new context with the specified settings overwritten. */
    contextWith(configuration: Partial<ContextSettings>): ParseContext;
    childContextForField(field: string): ParseContext;
    childContextForFieldPath(field: FieldPath): ParseContext;
    childContextForArray(index: number): ParseContext;
    createError(reason: string): Error;
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
    contains(fieldPath: FieldPath): boolean;
    private validatePath;
    private validatePathSegment;
}
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */
export declare class UserDataReader {
    private readonly databaseId;
    private readonly serializer;
    constructor(databaseId: DatabaseId, serializer?: JsonProtoSerializer);
    /** Parse document data from a non-merge set() call. */
    parseSetData(methodName: string, input: unknown): ParsedSetData;
    /** Parse document data from a set() call with '{merge:true}'. */
    parseMergeData(methodName: string, input: unknown, fieldPaths?: Array<string | firestore.FieldPath>): ParsedSetData;
    /** Parse update data from an update() call. */
    parseUpdateData(methodName: string, input: unknown): ParsedUpdateData;
    /** Parse update data from a list of field/value arguments. */
    parseUpdateVarargs(methodName: string, field: string | ExternalFieldPath, value: unknown, moreFieldsAndValues: unknown[]): ParsedUpdateData;
    /** Creates a new top-level parse context. */
    private createContext;
    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */
    parseQueryValue(methodName: string, input: unknown, allowArrays?: boolean): api.Value;
}
/**
 * Parses user data to Protobuf Values.
 *
 * @param input Data to be parsed.
 * @param context A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @return The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */
export declare function parseData(input: unknown, context: ParseContext): api.Value | null;
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */
export declare function fieldPathFromArgument(methodName: string, path: string | ExternalFieldPath): FieldPath;
export {};
