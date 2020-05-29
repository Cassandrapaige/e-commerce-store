import t from "@firebase/app";

import { Logger as e, LogLevel as s } from "@firebase/logger";

import { isMobileCordova as i, isReactNative as n, isElectron as r, isIE as h, isUWP as o, isBrowserExtension as a } from "@firebase/util";

import { Component as u } from "@firebase/component";

import { XhrIo as c, EventType as l, ErrorCode as _, createWebChannelTransport as f, WebChannel as d } from "@firebase/webchannel-wrapper";

/**
 * @license
 * Copyright 2017 Google Inc.
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
/** The semver (www.semver.org) version of the SDK. */ const T = t.SDK_VERSION;

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */ class w {
    constructor(t) {
        this.uid = t;
    }
    t() {
        return null != this.uid;
    }
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */    s() {
        return this.t() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(t) {
        return t.uid === this.uid;
    }
}

/** A user with a null UID. */ w.UNAUTHENTICATED = new w(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
w.i = new w("google-credentials-uid"), w.h = new w("first-party-uid");

/**
 * @license
 * Copyright 2017 Google Inc.
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
const E = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
};

/**
 * An error class used for Firestore-generated errors. Ideally we should be
 * using FirebaseError, but integrating with it is overly arduous at the moment,
 * so we define our own compatible error class (with a `name` of 'FirebaseError'
 * and compatible `code` and `message` fields.)
 */ class m extends Error {
    constructor(t, e) {
        super(e), this.code = t, this.message = e, this.name = "FirebaseError", 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
    }
}

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
 */ class I {
    constructor(t, e) {
        this.user = e, this.type = "OAuth", this.o = {}, 
        // Set the headers using Object Literal notation to avoid minification
        this.o.Authorization = `Bearer ${t}`;
    }
}

/** A CredentialsProvider that always yields an empty token. */ class R {
    constructor() {
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.u = null;
    }
    getToken() {
        return Promise.resolve(null);
    }
    l() {}
    _(t) {
        this.u = t, 
        // Fire with initial user.
        t(w.UNAUTHENTICATED);
    }
    T() {
        this.u = null;
    }
}

class A {
    constructor(t) {
        /**
         * The auth token listener registered with FirebaseApp, retained here so we
         * can unregister it.
         */
        this.m = null, 
        /** Tracks the current User. */
        this.currentUser = w.UNAUTHENTICATED, this.I = !1, 
        /**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */
        this.R = 0, 
        /** The listener registered with setChangeListener(). */
        this.u = null, this.forceRefresh = !1, this.m = () => {
            this.R++, this.currentUser = this.A(), this.I = !0, this.u && this.u(this.currentUser);
        }, this.R = 0, this.auth = t.getImmediate({
            optional: !0
        }), this.auth ? this.auth.addAuthTokenListener(this.m) : (
        // if auth is not available, invoke tokenListener once with null token
        this.m(null), t.get().then(t => {
            this.auth = t, this.m && 
            // tokenListener can be removed by removeChangeListener()
            this.auth.addAuthTokenListener(this.m);
        }, () => {}));
    }
    getToken() {
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
        const t = this.R, e = this.forceRefresh;
        return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then(e => {
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            if (this.R !== t) throw new m(E.ABORTED, "getToken aborted due to token change.");
            return e ? (ge("string" == typeof e.accessToken), new I(e.accessToken, this.currentUser)) : null;
        }) : Promise.resolve(null);
    }
    l() {
        this.forceRefresh = !0;
    }
    _(t) {
        this.u = t, 
        // Fire the initial event
        this.I && t(this.currentUser);
    }
    T() {
        this.auth && this.auth.removeAuthTokenListener(this.m), this.m = null, this.u = null;
    }
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    A() {
        const t = this.auth && this.auth.getUid();
        return ge(null === t || "string" == typeof t), new w(t);
    }
}

/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */ class P {
    constructor(t, e) {
        this.P = t, this.V = e, this.type = "FirstParty", this.user = w.h;
    }
    get o() {
        const t = {
            "X-Goog-AuthUser": this.V
        }, e = this.P.auth.p([]);
        return e && (t.Authorization = e), t;
    }
}

/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */ class V {
    constructor(t, e) {
        this.P = t, this.V = e;
    }
    getToken() {
        return Promise.resolve(new P(this.P, this.V));
    }
    _(t) {
        // Fire with initial uid.
        t(w.h);
    }
    T() {}
    l() {}
}

/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */ class p {
    constructor(t, e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new m(E.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new m(E.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new m(E.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new m(E.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    static now() {
        return p.fromMillis(Date.now());
    }
    static fromDate(t) {
        return p.fromMillis(t.getTime());
    }
    static fromMillis(t) {
        const e = Math.floor(t / 1e3);
        return new p(e, 1e6 * (t - 1e3 * e));
    }
    toDate() {
        return new Date(this.toMillis());
    }
    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
    g(t) {
        return this.seconds === t.seconds ? Se(this.nanoseconds, t.nanoseconds) : Se(this.seconds, t.seconds);
    }
    isEqual(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }
    toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }
    valueOf() {
        // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
        // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
        // with zeroes to be a consistent length. Strings with this format then have a lexiographical
        // ordering that matches the expected ordering. The <seconds> translation is done to avoid
        // having a leading negative sign (i.e. a leading '-' character) in its string representation,
        // which would affect its lexiographical ordering.
        const t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }
}

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
/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */ class y {
    constructor(t) {
        this.timestamp = t;
    }
    static v(t) {
        return new y(t);
    }
    static min() {
        return new y(new p(0, 0));
    }
    S(t) {
        return this.timestamp.g(t.timestamp);
    }
    isEqual(t) {
        return this.timestamp.isEqual(t.timestamp);
    }
    /** Returns a number representation of the version for use in spec tests. */    C() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    D() {
        return this.timestamp;
    }
}

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
/**
 * Path represents an ordered sequence of string segments.
 */
class g {
    constructor(t, e, s) {
        void 0 === e ? e = 0 : e > t.length && ye(), void 0 === s ? s = t.length - e : s > t.length - e && ye(), 
        this.segments = t, this.offset = e, this.F = s;
    }
    get length() {
        return this.F;
    }
    isEqual(t) {
        return 0 === g.N(this, t);
    }
    child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return t instanceof g ? t.forEach(t => {
            e.push(t);
        }) : e.push(t), this.$(e);
    }
    /** The index of one past the last segment of the path. */    limit() {
        return this.offset + this.length;
    }
    L(t) {
        return t = void 0 === t ? 1 : t, this.$(this.segments, this.offset + t, this.length - t);
    }
    k() {
        return this.$(this.segments, this.offset, this.length - 1);
    }
    O() {
        return this.segments[this.offset];
    }
    q() {
        return this.get(this.length - 1);
    }
    get(t) {
        return this.segments[this.offset + t];
    }
    M() {
        return 0 === this.length;
    }
    B(t) {
        if (t.length < this.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    U(t) {
        if (this.length + 1 !== t.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    forEach(t) {
        for (let e = this.offset, s = this.limit(); e < s; e++) t(this.segments[e]);
    }
    W() {
        return this.segments.slice(this.offset, this.limit());
    }
    static N(t, e) {
        const s = Math.min(t.length, e.length);
        for (let i = 0; i < s; i++) {
            const s = t.get(i), n = e.get(i);
            if (s < n) return -1;
            if (s > n) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }
}

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 */ class b extends g {
    $(t, e, s) {
        return new b(t, e, s);
    }
    j() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.W().join("/");
    }
    toString() {
        return this.j();
    }
    /**
     * Creates a resource path from the given slash-delimited string.
     */    static G(t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        if (t.indexOf("//") >= 0) throw new m(E.INVALID_ARGUMENT, `Invalid path (${t}). Paths must not contain // in them.`);
        // We may still have an empty segment at the beginning or end if they had a
        // leading or trailing slash (which we allow).
                const e = t.split("/").filter(t => t.length > 0);
        return new b(e);
    }
}

b.H = new b([]);

const v = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

/** A dot-separated path for navigating sub-objects within a document. */ class S extends g {
    $(t, e, s) {
        return new S(t, e, s);
    }
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */    static K(t) {
        return v.test(t);
    }
    j() {
        return this.W().map(t => (t = t.replace("\\", "\\\\").replace("`", "\\`"), S.K(t) || (t = "`" + t + "`"), 
        t)).join(".");
    }
    toString() {
        return this.j();
    }
    /**
     * Returns true if this field references the key of a document.
     */    Y() {
        return 1 === this.length && "__name__" === this.get(0);
    }
    /**
     * The field designating the key of a document.
     */    static X() {
        return new S([ "__name__" ]);
    }
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */    static J(t) {
        const e = [];
        let s = "", i = 0;
        const n = () => {
            if (0 === s.length) throw new m(E.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin ` + "with '.', end with '.', or contain '..'");
            e.push(s), s = "";
        };
        let r = !1;
        for (;i < t.length; ) {
            const e = t[i];
            if ("\\" === e) {
                if (i + 1 === t.length) throw new m(E.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                const e = t[i + 1];
                if ("\\" !== e && "." !== e && "`" !== e) throw new m(E.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                s += e, i += 2;
            } else "`" === e ? (r = !r, i++) : "." !== e || r ? (s += e, i++) : (n(), i++);
        }
        if (n(), r) throw new m(E.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new S(e);
    }
}

S.H = new S([]);

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
class C {
    constructor(t) {
        this.path = t;
    }
    static Z(t) {
        return new C(b.G(t).L(5));
    }
    /** Returns true if the document is in the specified collectionId. */    tt(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }
    isEqual(t) {
        return null !== t && 0 === b.N(this.path, t.path);
    }
    toString() {
        return this.path.toString();
    }
    static N(t, e) {
        return b.N(t.path, e.path);
    }
    static et(t) {
        return t.length % 2 == 0;
    }
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments The segments of the path to the document
     * @return A new instance of DocumentKey
     */    static st(t) {
        return new C(new b(t.slice()));
    }
}

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
function D(t) {
    let e = 0;
    for (const s in t) Object.prototype.hasOwnProperty.call(t, s) && e++;
    return e;
}

function F(t, e) {
    for (const s in t) Object.prototype.hasOwnProperty.call(t, s) && e(s, t[s]);
}

function N(t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
}

/**
 * @license
 * Copyright 2020 Google LLC
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
/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 */ C.EMPTY = new C(new b([]));

class $ {
    constructor(t) {
        this.it = t;
    }
    static fromBase64String(t) {
        const e = me.nt().atob(t);
        return new $(e);
    }
    static fromUint8Array(t) {
        const e = 
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            let e = "";
            for (let s = 0; s < t.length; ++s) e += String.fromCharCode(t[s]);
            return e;
        }
        /**
 * Helper function to convert a binary string to an Uint8Array.
 */ (t);
        return new $(e);
    }
    toBase64() {
        return me.nt().btoa(this.it);
    }
    toUint8Array() {
        return function(t) {
            const e = new Uint8Array(t.length);
            for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
            return e;
        }
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
        /**
 * Returns whether a variable is either undefined or null.
 */ (this.it);
    }
    rt() {
        return 2 * this.it.length;
    }
    S(t) {
        return Se(this.it, t.it);
    }
    isEqual(t) {
        return this.it === t.it;
    }
}

function L(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function k(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return -0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value The value to test for being an integer and in the safe range
 */ $.ht = new $("");

function O(t) {
    var e, s;
    return "server_timestamp" === (null === (s = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === s ? void 0 : s.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the local time at which this timestamp was first set.
 */
function q(t) {
    const e = H(t.mapValue.fields.__local_write_time__.timestampValue);
    return new p(e.seconds, e.nanos);
}

/**
 * @license
 * Copyright 2020 Google LLC
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
// A RegExp matching ISO 8601 UTC timestamps with optional fraction.
const M = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/** Extracts the backend's type order for the provided value. */ function x(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? O(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : ye();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function B(t, e) {
    const s = x(t);
    if (s !== x(e)) return !1;
    switch (s) {
      case 0 /* NullValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return q(t).isEqual(q(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            const s = H(t.timestampValue), i = H(e.timestampValue);
            return s.seconds === i.seconds && s.nanos === i.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return z(t.bytesValue).isEqual(z(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return K(t.geoPointValue.latitude) === K(e.geoPointValue.latitude) && K(t.geoPointValue.longitude) === K(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return K(t.integerValue) === K(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                const s = K(t.doubleValue), i = K(e.doubleValue);
                return s === i ? k(s) === k(i) : isNaN(s) && isNaN(i);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return Ce(t.arrayValue.values || [], e.arrayValue.values || [], B);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const s = t.mapValue.fields || {}, i = e.mapValue.fields || {};
            if (D(s) !== D(i)) return !1;
            for (const t in s) if (s.hasOwnProperty(t) && (void 0 === i[t] || !B(s[t], i[t]))) return !1;
            return !0;
        }
        /** Returns true if the ArrayValue contains the specified element. */ (t, e);

      default:
        return ye();
    }
}

function U(t, e) {
    return void 0 !== (t.values || []).find(t => B(t, e));
}

function Q(t, e) {
    const s = x(t), i = x(e);
    if (s !== i) return Se(s, i);
    switch (s) {
      case 0 /* NullValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return Se(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            const s = K(t.integerValue || t.doubleValue), i = K(e.integerValue || e.doubleValue);
            return s < i ? -1 : s > i ? 1 : s === i ? 0 : 
            // one or both are NaN.
            isNaN(s) ? isNaN(i) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return W(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return W(q(t), q(e));

      case 5 /* StringValue */ :
        return Se(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            const s = z(t), i = z(e);
            return s.S(i);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            const s = t.split("/"), i = e.split("/");
            for (let t = 0; t < s.length && t < i.length; t++) {
                const e = Se(s[t], i[t]);
                if (0 !== e) return e;
            }
            return Se(s.length, i.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            const s = Se(K(t.latitude), K(e.latitude));
            if (0 !== s) return s;
            return Se(K(t.longitude), K(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            const s = t.values || [], i = e.values || [];
            for (let t = 0; t < s.length && t < i.length; ++t) {
                const e = Q(s[t], i[t]);
                if (e) return e;
            }
            return Se(s.length, i.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const s = t.fields || {}, i = Object.keys(s), n = e.fields || {}, r = Object.keys(n);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
            i.sort(), r.sort();
            for (let t = 0; t < i.length && t < r.length; ++t) {
                const e = Se(i[t], r[t]);
                if (0 !== e) return e;
                const h = Q(s[i[t]], n[r[t]]);
                if (0 !== h) return h;
            }
            return Se(i.length, r.length);
        }
        /**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */ (t.mapValue, e.mapValue);

      default:
        throw ye();
    }
}

function W(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return Se(t, e);
    const s = H(t), i = H(e), n = Se(s.seconds, i.seconds);
    return 0 !== n ? n : Se(s.nanos, i.nanos);
}

function j(t) {
    return G(t);
}

function G(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        const e = H(t);
        return `time(${e.seconds},${e.nanos})`;
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? z(t.bytesValue).toBase64() : "referenceValue" in t ? (s = t.referenceValue, 
    C.Z(s).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
        let e = "[", s = !0;
        for (const i of t.values || []) s ? s = !1 : e += ",", e += G(i);
        return e + "]";
    }
    /**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ (t.arrayValue) : "mapValue" in t ? function(t) {
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        const e = Object.keys(t.fields || {}).sort();
        let s = "{", i = !0;
        for (const n of e) i ? i = !1 : s += ",", s += `${n}:${G(t.fields[n])}`;
        return s + "}";
    }(t.mapValue) : ye();
    var e, s;
}

function H(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (ge(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        let e = 0;
        const s = M.exec(t);
        if (ge(!!s), s[1]) {
            // Pad the fraction out to 9 digits (nanos).
            let t = s[1];
            t = (t + "000000000").substr(0, 9), e = Number(t);
        }
        // Parse the date to get the seconds.
                const i = new Date(t);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: K(t.seconds),
        nanos: K(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function K(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function z(t) {
    return "string" == typeof t ? $.fromBase64String(t) : $.fromUint8Array(t);
}

/** Returns a reference value for the provided database and key. */ function Y(t, e) {
    return {
        referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.j()}`
    };
}

/** Returns true if `value` is an IntegerValue . */ function X(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */
function J(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function Z(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function tt(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function et(t) {
    return !!t && "mapValue" in t;
}

/**
 * @license
 * Copyright 2018 Google LLC
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
/** Transforms a value into a server-generated timestamp. */ class st {
    constructor() {}
    ot(t, e) {
        return function(t, e) {
            const s = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (s.fields.__previous_value__ = e), {
                mapValue: s
            };
        }
        /**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */ (e, t);
    }
    at(t, e) {
        return e;
    }
    ut(t) {
        return null;
 // Server timestamps are idempotent and don't require a base value.
        }
    isEqual(t) {
        return t instanceof st;
    }
}

st.instance = new st;

/** Transforms an array value via a union operation. */
class it {
    constructor(t) {
        this.elements = t;
    }
    ot(t, e) {
        return this.apply(t);
    }
    at(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }
    apply(t) {
        const e = ht(t);
        for (const t of this.elements) e.some(e => B(e, t)) || e.push(t);
        return {
            arrayValue: {
                values: e
            }
        };
    }
    ut(t) {
        return null;
 // Array transforms are idempotent and don't require a base value.
        }
    isEqual(t) {
        return t instanceof it && Ce(this.elements, t.elements, B);
    }
}

/** Transforms an array value via a remove operation. */ class nt {
    constructor(t) {
        this.elements = t;
    }
    ot(t, e) {
        return this.apply(t);
    }
    at(t, e) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return this.apply(t);
    }
    apply(t) {
        let e = ht(t);
        for (const t of this.elements) e = e.filter(e => !B(e, t));
        return {
            arrayValue: {
                values: e
            }
        };
    }
    ut(t) {
        return null;
 // Array transforms are idempotent and don't require a base value.
        }
    isEqual(t) {
        return t instanceof nt && Ce(this.elements, t.elements, B);
    }
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ class rt {
    constructor(t, e) {
        this.serializer = t, this.ct = e;
    }
    ot(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        const s = this.ut(t), i = this.asNumber(s) + this.asNumber(this.ct);
        return X(s) && X(this.ct) ? this.serializer.lt(i) : this.serializer._t(i);
    }
    at(t, e) {
        return e;
    }
    /**
     * Inspects the provided value, returning the provided value if it is already
     * a NumberValue, otherwise returning a coerced value of 0.
     */    ut(t) {
        return X(e = t) || function(t) {
            return !!t && "doubleValue" in t;
        }
        /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (e) ? t : {
            integerValue: 0
        };
        var e;
    }
    isEqual(t) {
        return t instanceof rt && B(this.ct, t.ct);
    }
    asNumber(t) {
        return K(t.integerValue || t.doubleValue);
    }
}

function ht(t) {
    return J(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
}

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
/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ class ot {
    constructor(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(S.N);
    }
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */    ft(t) {
        for (const e of this.fields) if (e.B(t)) return !0;
        return !1;
    }
    isEqual(t) {
        return Ce(this.fields, t.fields, (t, e) => t.isEqual(e));
    }
}

/** A field path and the TransformOperation to perform upon it. */ class at {
    constructor(t, e) {
        this.field = t, this.transform = e;
    }
    isEqual(t) {
        return this.field.isEqual(t.field) && this.transform.isEqual(t.transform);
    }
}

/** The result of successfully applying a mutation to the backend. */ class ut {
    constructor(
    /**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
    t, 
    /**
     * The resulting fields returned from the backend after a
     * TransformMutation has been committed. Contains one FieldValue for each
     * FieldTransform that was in the mutation.
     *
     * Will be null if the mutation was not a TransformMutation.
     */
    e) {
        this.version = t, this.transformResults = e;
    }
}

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */ class ct {
    constructor(t, e) {
        this.updateTime = t, this.exists = e;
    }
    /** Creates a new empty Precondition. */    static dt() {
        return new ct;
    }
    /** Creates a new Precondition with an exists flag. */    static exists(t) {
        return new ct(void 0, t);
    }
    /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
        return new ct(t);
    }
    /** Returns whether this Precondition is empty. */    get Tt() {
        return void 0 === this.updateTime && void 0 === this.exists;
    }
    /**
     * Returns true if the preconditions is valid for the given document
     * (or null if no document is available).
     */    wt(t) {
        return void 0 !== this.updateTime ? t instanceof At && t.version.isEqual(this.updateTime) : void 0 === this.exists || this.exists === t instanceof At;
    }
    isEqual(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }
}

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set, Patch, and Transform mutations. For Delete
 * mutations, we reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        null                  Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      null                  null
 * TransformMutation  Document(v3)          Document(v3)
 * TransformMutation  NoDocument(v3)        NoDocument(v3)
 * TransformMutation  null                  null
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     null                  NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set, Patch, and Transform mutations. As deletes
 * have no explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we return an `UnknownDocument` and rely on Watch to send us the
 * updated version.
 *
 * Note that TransformMutations don't create Documents (in the case of being
 * applied to a NoDocument), even though they would on the backend. This is
 * because the client always combines the TransformMutation with a SetMutation
 * or PatchMutation and we only want to apply the transform if the prior
 * mutation resulted in a Document (always true for a SetMutation, but not
 * necessarily for a PatchMutation).
 *
 * ## Subclassing Notes
 *
 * Subclasses of Mutation need to implement applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document.
 */ class lt {
    Et(t) {}
    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */    static It(t) {
        return t instanceof At ? t.version : y.min();
    }
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ class _t extends lt {
    constructor(t, e, s) {
        super(), this.key = t, this.value = e, this.Rt = s, this.type = 0 /* Set */;
    }
    at(t, e) {
        this.Et(t);
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        const s = e.version;
        return new At(this.key, s, this.value, {
            hasCommittedMutations: !0
        });
    }
    ot(t, e, s) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        const i = lt.It(t);
        return new At(this.key, i, this.value, {
            At: !0
        });
    }
    Pt(t) {
        return null;
    }
    isEqual(t) {
        return t instanceof _t && this.key.isEqual(t.key) && this.value.isEqual(t.value) && this.Rt.isEqual(t.Rt);
    }
}

/**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */ class ft extends lt {
    constructor(t, e, s, i) {
        super(), this.key = t, this.data = e, this.Vt = s, this.Rt = i, this.type = 1 /* Patch */;
    }
    at(t, e) {
        if (this.Et(t), !this.Rt.wt(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new Vt(this.key, e.version);
        const s = this.pt(t);
        return new At(this.key, e.version, s, {
            hasCommittedMutations: !0
        });
    }
    ot(t, e, s) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        const i = lt.It(t), n = this.pt(t);
        return new At(this.key, i, n, {
            At: !0
        });
    }
    Pt(t) {
        return null;
    }
    isEqual(t) {
        return t instanceof ft && this.key.isEqual(t.key) && this.Vt.isEqual(t.Vt) && this.Rt.isEqual(t.Rt);
    }
    /**
     * Patches the data of document if available or creates a new document. Note
     * that this does not check whether or not the precondition of this patch
     * holds.
     */    pt(t) {
        let e;
        return e = t instanceof At ? t.data() : Et.empty(), this.yt(e);
    }
    yt(t) {
        const e = new mt(t);
        return this.Vt.fields.forEach(t => {
            if (!t.M()) {
                const s = this.data.field(t);
                null !== s ? e.set(t, s) : e.delete(t);
            }
        }), e.gt();
    }
}

/**
 * A mutation that modifies specific fields of the document with transform
 * operations. Currently the only supported transform is a server timestamp, but
 * IP Address, increment(n), etc. could be supported in the future.
 *
 * It is somewhat similar to a PatchMutation in that it patches specific fields
 * and has no effect when applied to a null or NoDocument (see comment on
 * Mutation for rationale).
 */ class dt extends lt {
    constructor(t, e) {
        super(), this.key = t, this.fieldTransforms = e, this.type = 2 /* Transform */ , 
        // NOTE: We set a precondition of exists: true as a safety-check, since we
        // always combine TransformMutations with a SetMutation or PatchMutation which
        // (if successful) should end up with an existing document.
        this.Rt = ct.exists(!0);
    }
    at(t, e) {
        if (this.Et(t), ge(null != e.transformResults), !this.Rt.wt(t)) 
        // Since the mutation was not rejected, we know that the  precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and return an UnknownDocument with the
        // known updateTime.
        return new Vt(this.key, e.version);
        const s = this.bt(t), i = this.vt(t, e.transformResults), n = e.version, r = this.St(s.data(), i);
        return new At(this.key, n, r, {
            hasCommittedMutations: !0
        });
    }
    ot(t, e, s) {
        if (this.Et(t), !this.Rt.wt(t)) return t;
        const i = this.bt(t), n = this.Ct(s, t, e), r = this.St(i.data(), n);
        return new At(this.key, i.version, r, {
            At: !0
        });
    }
    Pt(t) {
        let e = null;
        for (const s of this.fieldTransforms) {
            const i = t instanceof At ? t.field(s.field) : void 0, n = s.transform.ut(i || null);
            null != n && (e = null == e ? (new mt).set(s.field, n) : e.set(s.field, n));
        }
        return e ? e.gt() : null;
    }
    isEqual(t) {
        return t instanceof dt && this.key.isEqual(t.key) && Ce(this.fieldTransforms, t.fieldTransforms, (t, e) => t.isEqual(e)) && this.Rt.isEqual(t.Rt);
    }
    /**
     * Asserts that the given MaybeDocument is actually a Document and verifies
     * that it matches the key for this mutation. Since we only support
     * transformations with precondition exists this method is guaranteed to be
     * safe.
     */    bt(t) {
        return t;
    }
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a
     * TransformMutation has been acknowledged by the server.
     *
     * @param baseDoc The document prior to applying this mutation batch.
     * @param serverTransformResults The transform results received by the server.
     * @return The transform results list.
     */    vt(t, e) {
        const s = [];
        ge(this.fieldTransforms.length === e.length);
        for (let i = 0; i < e.length; i++) {
            const n = this.fieldTransforms[i], r = n.transform;
            let h = null;
            t instanceof At && (h = t.field(n.field)), s.push(r.at(h, e[i]));
        }
        return s;
    }
    /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * TransformMutation locally.
     *
     * @param localWriteTime The local time of the transform mutation (used to
     *     generate ServerTimestampValues).
     * @param maybeDoc The current state of the document after applying all
     *     previous mutations.
     * @param baseDoc The document prior to applying this mutation batch.
     * @return The transform results list.
     */    Ct(t, e, s) {
        const i = [];
        for (const n of this.fieldTransforms) {
            const r = n.transform;
            let h = null;
            e instanceof At && (h = e.field(n.field)), null === h && s instanceof At && (
            // If the current document does not contain a value for the mutated
            // field, use the value that existed before applying this mutation
            // batch. This solves an edge case where a PatchMutation clears the
            // values in a nested map before the TransformMutation is applied.
            h = s.field(n.field)), i.push(r.ot(h, t));
        }
        return i;
    }
    St(t, e) {
        const s = new mt(t);
        for (let t = 0; t < this.fieldTransforms.length; t++) {
            const i = this.fieldTransforms[t].field;
            s.set(i, e[t]);
        }
        return s.gt();
    }
}

/** A mutation that deletes the document at the given key. */ class Tt extends lt {
    constructor(t, e) {
        super(), this.key = t, this.Rt = e, this.type = 3 /* Delete */;
    }
    at(t, e) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        return this.Et(t), new Pt(this.key, e.version, {
            hasCommittedMutations: !0
        });
    }
    ot(t, e, s) {
        return this.Et(t), this.Rt.wt(t) ? new Pt(this.key, y.min()) : t;
    }
    Pt(t) {
        return null;
    }
    isEqual(t) {
        return t instanceof Tt && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }
}

/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */ class wt extends lt {
    constructor(t, e) {
        super(), this.key = t, this.Rt = e, this.type = 4 /* Verify */;
    }
    at(t, e) {
        ye();
    }
    ot(t, e, s) {
        ye();
    }
    Pt(t) {
        ye();
    }
    isEqual(t) {
        return t instanceof wt && this.key.isEqual(t.key) && this.Rt.isEqual(t.Rt);
    }
}

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
/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */ class Et {
    constructor(t) {
        this.proto = t;
    }
    static empty() {
        return new Et({
            mapValue: {}
        });
    }
    /**
     * Returns the value at the given path or null.
     *
     * @param path the path to search
     * @return The value at the path or if there it doesn't exist.
     */    field(t) {
        if (t.M()) return this.proto;
        {
            let e = this.proto;
            for (let s = 0; s < t.length - 1; ++s) {
                if (!e.mapValue.fields) return null;
                if (e = e.mapValue.fields[t.get(s)], !et(e)) return null;
            }
            return e = (e.mapValue.fields || {})[t.q()], e || null;
        }
    }
    isEqual(t) {
        return B(this.proto, t.proto);
    }
}

/**
 * An ObjectValueBuilder provides APIs to set and delete fields from an
 * ObjectValue.
 */ class mt {
    /**
     * @param baseObject The object to mutate.
     */
    constructor(t = Et.empty()) {
        this.Dt = t, 
        /** A map that contains the accumulated changes in this builder. */
        this.Ft = new Map;
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path The field path to set.
     * @param value The value to set.
     * @return The current Builder instance.
     */    set(t, e) {
        return this.Nt(t, e), this;
    }
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path The field path to remove.
     * @return The current Builder instance.
     */    delete(t) {
        return this.Nt(t, null), this;
    }
    /**
     * Adds `value` to the overlay map at `path`. Creates nested map entries if
     * needed.
     */    Nt(t, e) {
        let s = this.Ft;
        for (let e = 0; e < t.length - 1; ++e) {
            const i = t.get(e);
            let n = s.get(i);
            n instanceof Map ? 
            // Re-use a previously created map
            s = n : n && 10 /* ObjectValue */ === x(n) ? (
            // Convert the existing Protobuf MapValue into a map
            n = new Map(Object.entries(n.mapValue.fields || {})), s.set(i, n), s = n) : (
            // Create an empty map to represent the current nesting level
            n = new Map, s.set(i, n), s = n);
        }
        s.set(t.q(), e);
    }
    /** Returns an ObjectValue with all mutations applied. */    gt() {
        const t = this.$t(S.H, this.Ft);
        return null != t ? new Et(t) : this.Dt;
    }
    /**
     * Applies any overlays from `currentOverlays` that exist at `currentPath`
     * and returns the merged data at `currentPath` (or null if there were no
     * changes).
     *
     * @param currentPath The path at the current nesting level. Can be set to
     * FieldValue.EMPTY_PATH to represent the root.
     * @param currentOverlays The overlays at the current nesting level in the
     * same format as `overlayMap`.
     * @return The merged data at `currentPath` or null if no modifications
     * were applied.
     */    $t(t, e) {
        let s = !1;
        const i = this.Dt.field(t), n = et(i) ? // If there is already data at the current path, base our
        Object.assign({}, i.mapValue.fields) : {};
        return e.forEach((e, i) => {
            if (e instanceof Map) {
                const r = this.$t(t.child(i), e);
                null != r && (n[i] = r, s = !0);
            } else null !== e ? (n[i] = e, s = !0) : n.hasOwnProperty(i) && (delete n[i], s = !0);
        }), s ? {
            mapValue: {
                fields: n
            }
        } : null;
    }
}

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function It(t) {
    const e = [];
    return F(t.fields || {}, (t, s) => {
        const i = new S([ t ]);
        if (et(s)) {
            const t = It(s.mapValue).fields;
            if (0 === t.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(i); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (const s of t) e.push(i.child(s));
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(i);
    }), new ot(e);
}

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
/**
 * The result of a lookup for a given path may be an existing document or a
 * marker that this document does not exist at a given version.
 */ class Rt {
    constructor(t, e) {
        this.key = t, this.version = e;
    }
}

/**
 * Represents a document in Firestore with a key, version, data and whether the
 * data has local mutations applied to it.
 */ class At extends Rt {
    constructor(t, e, s, i) {
        super(t, e), this.Lt = s, this.At = !!i.At, this.hasCommittedMutations = !!i.hasCommittedMutations;
    }
    field(t) {
        return this.Lt.field(t);
    }
    data() {
        return this.Lt;
    }
    kt() {
        return this.Lt.proto;
    }
    isEqual(t) {
        return t instanceof At && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.At === t.At && this.hasCommittedMutations === t.hasCommittedMutations && this.Lt.isEqual(t.Lt);
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${this.Lt.toString()}, ` + `{hasLocalMutations: ${this.At}}), ` + `{hasCommittedMutations: ${this.hasCommittedMutations}})`;
    }
    get hasPendingWrites() {
        return this.At || this.hasCommittedMutations;
    }
}

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
/**
 * A class representing a deleted document.
 * Version is set to 0 if we don't point to any specific time, otherwise it
 * denotes time we know it didn't exist at.
 */
class Pt extends Rt {
    constructor(t, e, s) {
        super(t, e), this.hasCommittedMutations = !(!s || !s.hasCommittedMutations);
    }
    toString() {
        return `NoDocument(${this.key}, ${this.version})`;
    }
    get hasPendingWrites() {
        return this.hasCommittedMutations;
    }
    isEqual(t) {
        return t instanceof Pt && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }
}

/**
 * A class representing an existing document whose data is unknown (e.g. a
 * document that was updated without a known base document).
 */ class Vt extends Rt {
    toString() {
        return `UnknownDocument(${this.key}, ${this.version})`;
    }
    get hasPendingWrites() {
        return !0;
    }
    isEqual(t) {
        return t instanceof Vt && t.version.isEqual(this.version) && t.key.isEqual(this.key);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
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
/**
 * A Target represents the WatchTarget representation of a Query, which is used
 * by the LocalStore and the RemoteStore to keep track of and to execute
 * backend queries. While a Query can represent multiple Targets, each Targets
 * maps to a single WatchTarget in RemoteStore and a single TargetData entry
 * in persistence.
 */ class pt {
    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this constructor, because `Query` provides an implicit `orderBy`
     * property.
     */
    constructor(t, e = null, s = [], i = [], n = null, r = null, h = null) {
        this.path = t, this.collectionGroup = e, this.orderBy = s, this.filters = i, this.limit = n, 
        this.startAt = r, this.endAt = h, this.Ot = null;
    }
    canonicalId() {
        if (null === this.Ot) {
            let t = this.path.j();
            null !== this.collectionGroup && (t += "|cg:" + this.collectionGroup), t += "|f:", 
            t += this.filters.map(t => t.canonicalId()).join(","), t += "|ob:", t += this.orderBy.map(t => t.canonicalId()).join(","), 
            L(this.limit) || (t += "|l:", t += this.limit), this.startAt && (t += "|lb:", t += this.startAt.canonicalId()), 
            this.endAt && (t += "|ub:", t += this.endAt.canonicalId()), this.Ot = t;
        }
        return this.Ot;
    }
    toString() {
        let t = this.path.j();
        return null !== this.collectionGroup && (t += " collectionGroup=" + this.collectionGroup), 
        this.filters.length > 0 && (t += `, filters: [${this.filters.join(", ")}]`), L(this.limit) || (t += ", limit: " + this.limit), 
        this.orderBy.length > 0 && (t += `, orderBy: [${this.orderBy.join(", ")}]`), this.startAt && (t += ", startAt: " + this.startAt.canonicalId()), 
        this.endAt && (t += ", endAt: " + this.endAt.canonicalId()), `Target(${t})`;
    }
    isEqual(t) {
        if (this.limit !== t.limit) return !1;
        if (this.orderBy.length !== t.orderBy.length) return !1;
        for (let e = 0; e < this.orderBy.length; e++) if (!this.orderBy[e].isEqual(t.orderBy[e])) return !1;
        if (this.filters.length !== t.filters.length) return !1;
        for (let e = 0; e < this.filters.length; e++) if (!this.filters[e].isEqual(t.filters[e])) return !1;
        return this.collectionGroup === t.collectionGroup && (!!this.path.isEqual(t.path) && (!!(null !== this.startAt ? this.startAt.isEqual(t.startAt) : null === t.startAt) && (null !== this.endAt ? this.endAt.isEqual(t.endAt) : null === t.endAt)));
    }
    qt() {
        return C.et(this.path) && null === this.collectionGroup && 0 === this.filters.length;
    }
}

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
/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 */ class yt {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    constructor(t, e = null, s = [], i = [], n = null, r = "F" /* First */ , h = null, o = null) {
        this.path = t, this.collectionGroup = e, this.Mt = s, this.filters = i, this.limit = n, 
        this.xt = r, this.startAt = h, this.endAt = o, this.Bt = null, 
        // The corresponding `Target` of this `Query` instance.
        this.Ut = null, this.startAt && this.Qt(this.startAt), this.endAt && this.Qt(this.endAt);
    }
    static Wt(t) {
        return new yt(t);
    }
    get orderBy() {
        if (null === this.Bt) {
            this.Bt = [];
            const t = this.jt(), e = this.Gt();
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.Y() || this.Bt.push(new Nt(t)), this.Bt.push(new Nt(S.X(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of this.Mt) this.Bt.push(e), e.field.Y() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = this.Mt.length > 0 ? this.Mt[this.Mt.length - 1].dir : "asc" /* ASCENDING */;
                    this.Bt.push(new Nt(S.X(), t));
                }
            }
        }
        return this.Bt;
    }
    Ht(t) {
        const e = this.filters.concat([ t ]);
        return new yt(this.path, this.collectionGroup, this.Mt.slice(), e, this.limit, this.xt, this.startAt, this.endAt);
    }
    Kt(t) {
        // TODO(dimond): validate that orderBy does not list the same key twice.
        const e = this.Mt.concat([ t ]);
        return new yt(this.path, this.collectionGroup, e, this.filters.slice(), this.limit, this.xt, this.startAt, this.endAt);
    }
    zt(t) {
        return new yt(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), t, "F" /* First */ , this.startAt, this.endAt);
    }
    Yt(t) {
        return new yt(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), t, "L" /* Last */ , this.startAt, this.endAt);
    }
    Xt(t) {
        return new yt(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, t, this.endAt);
    }
    Jt(t) {
        return new yt(this.path, this.collectionGroup, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, this.startAt, t);
    }
    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */    Zt(t) {
        return new yt(t, 
        /*collectionGroup=*/ null, this.Mt.slice(), this.filters.slice(), this.limit, this.xt, this.startAt, this.endAt);
    }
    /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */    te() {
        return 0 === this.filters.length && null === this.limit && null == this.startAt && null == this.endAt && (0 === this.Mt.length || 1 === this.Mt.length && this.Mt[0].field.Y());
    }
    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    canonicalId() {
        return `${this.ee().canonicalId()}|lt:${this.xt}`;
    }
    toString() {
        return `Query(target=${this.ee().toString()}; limitType=${this.xt})`;
    }
    isEqual(t) {
        return this.ee().isEqual(t.ee()) && this.xt === t.xt;
    }
    se(t, e) {
        let s = !1;
        for (const i of this.orderBy) {
            const n = i.compare(t, e);
            if (0 !== n) return n;
            s = s || i.field.Y();
        }
        return 0;
    }
    matches(t) {
        return this.ie(t) && this.ne(t) && this.re(t) && this.he(t);
    }
    oe() {
        return !L(this.limit) && "F" /* First */ === this.xt;
    }
    ae() {
        return !L(this.limit) && "L" /* Last */ === this.xt;
    }
    Gt() {
        return this.Mt.length > 0 ? this.Mt[0].field : null;
    }
    jt() {
        for (const t of this.filters) if (t instanceof gt && t.ue()) return t.field;
        return null;
    }
    // Checks if any of the provided Operators are included in the query and
    // returns the first one that is, or null if none are.
    ce(t) {
        for (const e of this.filters) if (e instanceof gt && t.indexOf(e.op) >= 0) return e.op;
        return null;
    }
    qt() {
        return this.ee().qt();
    }
    le() {
        return null !== this.collectionGroup;
    }
    /**
     * Converts this `Query` instance to it's corresponding `Target`
     * representation.
     */    ee() {
        if (!this.Ut) if ("F" /* First */ === this.xt) this.Ut = new pt(this.path, this.collectionGroup, this.orderBy, this.filters, this.limit, this.startAt, this.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of this.orderBy) {
                const s = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Nt(e.field, s));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                        const e = this.endAt ? new Ft(this.endAt.position, !this.endAt.before) : null, s = this.startAt ? new Ft(this.startAt.position, !this.startAt.before) : null;
            // Now return as a LimitType.First query.
            this.Ut = new pt(this.path, this.collectionGroup, t, this.filters, this.limit, e, s);
        }
        return this.Ut;
    }
    ie(t) {
        const e = t.key.path;
        return null !== this.collectionGroup ? t.key.tt(this.collectionGroup) && this.path.B(e) : C.et(this.path) ? this.path.isEqual(e) : this.path.U(e);
    }
    /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */    ne(t) {
        for (const e of this.Mt) 
        // order by key always matches
        if (!e.field.Y() && null === t.field(e.field)) return !1;
        return !0;
    }
    re(t) {
        for (const e of this.filters) if (!e.matches(t)) return !1;
        return !0;
    }
    /**
     * Makes sure a document is within the bounds, if provided.
     */    he(t) {
        return !(this.startAt && !this.startAt._e(this.orderBy, t)) && (!this.endAt || !this.endAt._e(this.orderBy, t));
    }
    Qt(t) {}
}

class gt extends class {} {
    constructor(t, e, s) {
        super(), this.field = t, this.op = e, this.value = s;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    static create(t, e, s) {
        if (t.Y()) return "in" /* IN */ === e ? new vt(t, s) : new bt(t, e, s);
        if (Z(s)) {
            if ("==" /* EQUAL */ !== e) throw new m(E.INVALID_ARGUMENT, "Invalid query. Null supports only equality comparisons.");
            return new gt(t, e, s);
        }
        if (tt(s)) {
            if ("==" /* EQUAL */ !== e) throw new m(E.INVALID_ARGUMENT, "Invalid query. NaN supports only equality comparisons.");
            return new gt(t, e, s);
        }
        return "array-contains" /* ARRAY_CONTAINS */ === e ? new St(t, s) : "in" /* IN */ === e ? new Ct(t, s) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Dt(t, s) : new gt(t, e, s);
    }
    matches(t) {
        const e = t.field(this.field);
        // Only compare types with matching backend order (such as double and int).
                return null !== e && x(this.value) === x(e) && this.fe(Q(e, this.value));
    }
    fe(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return ye();
        }
    }
    ue() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ ].indexOf(this.op) >= 0;
    }
    canonicalId() {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return this.field.j() + this.op.toString() + j(this.value);
    }
    isEqual(t) {
        return t instanceof gt && (this.op === t.op && this.field.isEqual(t.field) && B(this.value, t.value));
    }
    toString() {
        return `${this.field.j()} ${this.op} ${j(this.value)}`;
    }
}

/** Filter that matches on key fields (i.e. '__name__'). */ class bt extends gt {
    constructor(t, e, s) {
        super(t, e, s), this.key = C.Z(s.referenceValue);
    }
    matches(t) {
        const e = C.N(t.key, this.key);
        return this.fe(e);
    }
}

/** Filter that matches on key fields within an array. */ class vt extends gt {
    constructor(t, e) {
        super(t, "in" /* IN */ , e), this.keys = (e.arrayValue.values || []).map(t => C.Z(t.referenceValue));
    }
    matches(t) {
        return this.keys.some(e => e.isEqual(t.key));
    }
}

/** A Filter that implements the array-contains operator. */ class St extends gt {
    constructor(t, e) {
        super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
    }
    matches(t) {
        const e = t.field(this.field);
        return J(e) && U(e.arrayValue, this.value);
    }
}

/** A Filter that implements the IN operator. */ class Ct extends gt {
    constructor(t, e) {
        super(t, "in" /* IN */ , e);
    }
    matches(t) {
        const e = t.field(this.field);
        return null !== e && U(this.value.arrayValue, e);
    }
}

/** A Filter that implements the array-contains-any operator. */ class Dt extends gt {
    constructor(t, e) {
        super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
    }
    matches(t) {
        const e = t.field(this.field);
        return !(!J(e) || !e.arrayValue.values) && e.arrayValue.values.some(t => U(this.value.arrayValue, t));
    }
}

/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */ class Ft {
    constructor(t, e) {
        this.position = t, this.before = e;
    }
    canonicalId() {
        // TODO(b/29183165): Make this collision robust.
        return `${this.before ? "b" : "a"}:${this.position.map(t => j(t)).join(",")}`;
    }
    /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */    _e(t, e) {
        let s = 0;
        for (let i = 0; i < this.position.length; i++) {
            const n = t[i], r = this.position[i];
            if (n.field.Y()) s = C.N(C.Z(r.referenceValue), e.key); else {
                s = Q(r, e.field(n.field));
            }
            if ("desc" /* DESCENDING */ === n.dir && (s *= -1), 0 !== s) break;
        }
        return this.before ? s <= 0 : s < 0;
    }
    isEqual(t) {
        if (null === t) return !1;
        if (this.before !== t.before || this.position.length !== t.position.length) return !1;
        for (let e = 0; e < this.position.length; e++) {
            if (!B(this.position[e], t.position[e])) return !1;
        }
        return !0;
    }
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ class Nt {
    constructor(t, e) {
        this.field = t, void 0 === e && (e = "asc" /* ASCENDING */), this.dir = e, this.de = t.Y();
    }
    compare(t, e) {
        const s = this.de ? C.N(t.key, e.key) : function(t, e, s) {
            const i = e.field(t), n = s.field(t);
            return null !== i && null !== n ? Q(i, n) : ye();
        }(this.field, t, e);
        switch (this.dir) {
          case "asc" /* ASCENDING */ :
            return s;

          case "desc" /* DESCENDING */ :
            return -1 * s;

          default:
            return ye();
        }
    }
    canonicalId() {
        // TODO(b/29183165): Make this collision robust.
        return this.field.j() + this.dir.toString();
    }
    toString() {
        return `${this.field.j()} (${this.dir})`;
    }
    isEqual(t) {
        return this.dir === t.dir && this.field.isEqual(t.field);
    }
}

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
/**
 * An immutable set of metadata that the local store tracks for each target.
 */ class $t {
    constructor(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    s, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    i, 
    /** The latest snapshot version seen for this target. */
    n = y.min()
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , r = y.min()
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , h = $.ht) {
        this.target = t, this.targetId = e, this.Te = s, this.sequenceNumber = i, this.we = n, 
        this.lastLimboFreeSnapshotVersion = r, this.resumeToken = h;
    }
    /** Creates a new target data instance with an updated sequence number. */    Ee(t) {
        return new $t(this.target, this.targetId, this.Te, t, this.we, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */    me(t, e) {
        return new $t(this.target, this.targetId, this.Te, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
    }
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */    Ie(t) {
        return new $t(this.target, this.targetId, this.Te, this.sequenceNumber, this.we, t, this.resumeToken);
    }
}

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
 */ class Lt {
    // TODO(b/33078163): just use simplest form of existence filter for now
    constructor(t) {
        this.count = t;
    }
}

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
/**
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */ var kt, Ot;

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function qt(t) {
    switch (t) {
      case E.OK:
        return ye();

      case E.CANCELLED:
      case E.UNKNOWN:
      case E.DEADLINE_EXCEEDED:
      case E.RESOURCE_EXHAUSTED:
      case E.INTERNAL:
      case E.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case E.UNAUTHENTICATED:
        return !1;

      case E.INVALID_ARGUMENT:
      case E.NOT_FOUND:
      case E.ALREADY_EXISTS:
      case E.PERMISSION_DENIED:
      case E.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case E.ABORTED:
      case E.OUT_OF_RANGE:
      case E.UNIMPLEMENTED:
      case E.DATA_LOSS:
        return !0;

      default:
        return ye();
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */
function Mt(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return Ve("GRPC error has no .code"), E.UNKNOWN;
    switch (t) {
      case kt.OK:
        return E.OK;

      case kt.CANCELLED:
        return E.CANCELLED;

      case kt.UNKNOWN:
        return E.UNKNOWN;

      case kt.DEADLINE_EXCEEDED:
        return E.DEADLINE_EXCEEDED;

      case kt.RESOURCE_EXHAUSTED:
        return E.RESOURCE_EXHAUSTED;

      case kt.INTERNAL:
        return E.INTERNAL;

      case kt.UNAVAILABLE:
        return E.UNAVAILABLE;

      case kt.UNAUTHENTICATED:
        return E.UNAUTHENTICATED;

      case kt.INVALID_ARGUMENT:
        return E.INVALID_ARGUMENT;

      case kt.NOT_FOUND:
        return E.NOT_FOUND;

      case kt.ALREADY_EXISTS:
        return E.ALREADY_EXISTS;

      case kt.PERMISSION_DENIED:
        return E.PERMISSION_DENIED;

      case kt.FAILED_PRECONDITION:
        return E.FAILED_PRECONDITION;

      case kt.ABORTED:
        return E.ABORTED;

      case kt.OUT_OF_RANGE:
        return E.OUT_OF_RANGE;

      case kt.UNIMPLEMENTED:
        return E.UNIMPLEMENTED;

      case kt.DATA_LOSS:
        return E.DATA_LOSS;

      default:
        return ye();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Ot = kt || (kt = {}))[Ot.OK = 0] = "OK", Ot[Ot.CANCELLED = 1] = "CANCELLED", 
Ot[Ot.UNKNOWN = 2] = "UNKNOWN", Ot[Ot.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Ot[Ot.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Ot[Ot.NOT_FOUND = 5] = "NOT_FOUND", 
Ot[Ot.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Ot[Ot.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Ot[Ot.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Ot[Ot.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Ot[Ot.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Ot[Ot.ABORTED = 10] = "ABORTED", 
Ot[Ot.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Ot[Ot.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Ot[Ot.INTERNAL = 13] = "INTERNAL", Ot[Ot.UNAVAILABLE = 14] = "UNAVAILABLE", Ot[Ot.DATA_LOSS = 15] = "DATA_LOSS";

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
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
class xt {
    constructor(t, e) {
        this.N = t, this.root = e || Ut.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
    Re(t, e) {
        return new xt(this.N, this.root.Re(t, e, this.N).Ae(null, null, Ut.Pe, null, null));
    }
    // Returns a copy of the map, with the specified key removed.
    remove(t) {
        return new xt(this.N, this.root.remove(t, this.N).Ae(null, null, Ut.Pe, null, null));
    }
    // Returns the value of the node with the given key, or null.
    get(t) {
        let e = this.root;
        for (;!e.M(); ) {
            const s = this.N(t, e.key);
            if (0 === s) return e.value;
            s < 0 ? e = e.left : s > 0 && (e = e.right);
        }
        return null;
    }
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    indexOf(t) {
        // Number of nodes that were pruned when descending right
        let e = 0, s = this.root;
        for (;!s.M(); ) {
            const i = this.N(t, s.key);
            if (0 === i) return e + s.left.size;
            i < 0 ? s = s.left : (
            // Count all nodes left of the node plus the node itself
            e += s.left.size + 1, s = s.right);
        }
        // Node not found
                return -1;
    }
    M() {
        return this.root.M();
    }
    // Returns the total number of nodes in the map.
    get size() {
        return this.root.size;
    }
    // Returns the minimum key in the map.
    Ve() {
        return this.root.Ve();
    }
    // Returns the maximum key in the map.
    pe() {
        return this.root.pe();
    }
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    ye(t) {
        return this.root.ye(t);
    }
    forEach(t) {
        this.ye((e, s) => (t(e, s), !1));
    }
    toString() {
        const t = [];
        return this.ye((e, s) => (t.push(`${e}:${s}`), !1)), `{${t.join(", ")}}`;
    }
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    ge(t) {
        return this.root.ge(t);
    }
    // Returns an iterator over the SortedMap.
    be() {
        return new Bt(this.root, null, this.N, !1);
    }
    ve(t) {
        return new Bt(this.root, t, this.N, !1);
    }
    Se() {
        return new Bt(this.root, null, this.N, !0);
    }
    Ce(t) {
        return new Bt(this.root, t, this.N, !0);
    }
}

 // end SortedMap
// An iterator over an LLRBNode.
class Bt {
    constructor(t, e, s, i) {
        this.De = i, this.Fe = [];
        let n = 1;
        for (;!t.M(); ) if (n = e ? s(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        i && (n *= -1), n < 0) 
        // This node is less than our start key. ignore it
        t = this.De ? t.left : t.right; else {
            if (0 === n) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.Fe.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
            this.Fe.push(t), t = this.De ? t.right : t.left;
        }
    }
    Ne() {
        let t = this.Fe.pop();
        const e = {
            key: t.key,
            value: t.value
        };
        if (this.De) for (t = t.left; !t.M(); ) this.Fe.push(t), t = t.right; else for (t = t.right; !t.M(); ) this.Fe.push(t), 
        t = t.left;
        return e;
    }
    $e() {
        return this.Fe.length > 0;
    }
    Le() {
        if (0 === this.Fe.length) return null;
        const t = this.Fe[this.Fe.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }
}

 // end SortedMapIterator
// Represents a node in a Left-leaning Red-Black tree.
class Ut {
    constructor(t, e, s, i, n) {
        this.key = t, this.value = e, this.color = null != s ? s : Ut.RED, this.left = null != i ? i : Ut.EMPTY, 
        this.right = null != n ? n : Ut.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
    Ae(t, e, s, i, n) {
        return new Ut(null != t ? t : this.key, null != e ? e : this.value, null != s ? s : this.color, null != i ? i : this.left, null != n ? n : this.right);
    }
    M() {
        return !1;
    }
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    ye(t) {
        return this.left.ye(t) || t(this.key, this.value) || this.right.ye(t);
    }
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    ge(t) {
        return this.right.ge(t) || t(this.key, this.value) || this.left.ge(t);
    }
    // Returns the minimum node in the tree.
    min() {
        return this.left.M() ? this : this.left.min();
    }
    // Returns the maximum key in the tree.
    Ve() {
        return this.min().key;
    }
    // Returns the maximum key in the tree.
    pe() {
        return this.right.M() ? this.key : this.right.pe();
    }
    // Returns new tree, with the key/value added.
    Re(t, e, s) {
        let i = this;
        const n = s(t, i.key);
        return i = n < 0 ? i.Ae(null, null, null, i.left.Re(t, e, s), null) : 0 === n ? i.Ae(null, e, null, null, null) : i.Ae(null, null, null, null, i.right.Re(t, e, s)), 
        i.ke();
    }
    Oe() {
        if (this.left.M()) return Ut.EMPTY;
        let t = this;
        return t.left.qe() || t.left.left.qe() || (t = t.Me()), t = t.Ae(null, null, null, t.left.Oe(), null), 
        t.ke();
    }
    // Returns new tree, with the specified item removed.
    remove(t, e) {
        let s, i = this;
        if (e(t, i.key) < 0) i.left.M() || i.left.qe() || i.left.left.qe() || (i = i.Me()), 
        i = i.Ae(null, null, null, i.left.remove(t, e), null); else {
            if (i.left.qe() && (i = i.xe()), i.right.M() || i.right.qe() || i.right.left.qe() || (i = i.Be()), 
            0 === e(t, i.key)) {
                if (i.right.M()) return Ut.EMPTY;
                s = i.right.min(), i = i.Ae(s.key, s.value, null, null, i.right.Oe());
            }
            i = i.Ae(null, null, null, null, i.right.remove(t, e));
        }
        return i.ke();
    }
    qe() {
        return this.color;
    }
    // Returns new tree after performing any needed rotations.
    ke() {
        let t = this;
        return t.right.qe() && !t.left.qe() && (t = t.Ue()), t.left.qe() && t.left.left.qe() && (t = t.xe()), 
        t.left.qe() && t.right.qe() && (t = t.Qe()), t;
    }
    Me() {
        let t = this.Qe();
        return t.right.left.qe() && (t = t.Ae(null, null, null, null, t.right.xe()), t = t.Ue(), 
        t = t.Qe()), t;
    }
    Be() {
        let t = this.Qe();
        return t.left.left.qe() && (t = t.xe(), t = t.Qe()), t;
    }
    Ue() {
        const t = this.Ae(null, null, Ut.RED, null, this.right.left);
        return this.right.Ae(null, null, this.color, t, null);
    }
    xe() {
        const t = this.Ae(null, null, Ut.RED, this.left.right, null);
        return this.left.Ae(null, null, this.color, null, t);
    }
    Qe() {
        const t = this.left.Ae(null, null, !this.left.color, null, null), e = this.right.Ae(null, null, !this.right.color, null, null);
        return this.Ae(null, null, !this.color, t, e);
    }
    // For testing.
    We() {
        const t = this.je();
        return Math.pow(2, t) <= this.size + 1;
    }
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    je() {
        if (this.qe() && this.left.qe()) throw ye();
        if (this.right.qe()) throw ye();
        const t = this.left.je();
        if (t !== this.right.je()) throw ye();
        return t + (this.qe() ? 0 : 1);
    }
}

 // end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Ut.EMPTY = null, Ut.RED = !0, Ut.Pe = !1;

// end LLRBEmptyNode
Ut.EMPTY = new 
// Represents an empty node (a leaf node in the Red-Black Tree).
class {
    constructor() {
        this.size = 0;
    }
    get key() {
        throw ye();
    }
    get value() {
        throw ye();
    }
    get color() {
        throw ye();
    }
    get left() {
        throw ye();
    }
    get right() {
        throw ye();
    }
    // Returns a copy of the current node.
    Ae(t, e, s, i, n) {
        return this;
    }
    // Returns a copy of the tree, with the specified key/value added.
    Re(t, e, s) {
        return new Ut(t, e);
    }
    // Returns a copy of the tree, with the specified key removed.
    remove(t, e) {
        return this;
    }
    M() {
        return !0;
    }
    ye(t) {
        return !1;
    }
    ge(t) {
        return !1;
    }
    Ve() {
        return null;
    }
    pe() {
        return null;
    }
    qe() {
        return !1;
    }
    // For testing.
    We() {
        return !0;
    }
    je() {
        return 0;
    }
};

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
/**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
class Qt {
    constructor(t) {
        this.N = t, this.data = new xt(this.N);
    }
    has(t) {
        return null !== this.data.get(t);
    }
    first() {
        return this.data.Ve();
    }
    last() {
        return this.data.pe();
    }
    get size() {
        return this.data.size;
    }
    indexOf(t) {
        return this.data.indexOf(t);
    }
    /** Iterates elements in order defined by "comparator" */    forEach(t) {
        this.data.ye((e, s) => (t(e), !1));
    }
    /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */    Ge(t, e) {
        const s = this.data.ve(t[0]);
        for (;s.$e(); ) {
            const i = s.Ne();
            if (this.N(i.key, t[1]) >= 0) return;
            e(i.key);
        }
    }
    /**
     * Iterates over `elem`s such that: start <= elem until false is returned.
     */    He(t, e) {
        let s;
        for (s = void 0 !== e ? this.data.ve(e) : this.data.be(); s.$e(); ) {
            if (!t(s.Ne().key)) return;
        }
    }
    /** Finds the least element greater than or equal to `elem`. */    Ke(t) {
        const e = this.data.ve(t);
        return e.$e() ? e.Ne().key : null;
    }
    be() {
        return new Wt(this.data.be());
    }
    ve(t) {
        return new Wt(this.data.ve(t));
    }
    /** Inserts or updates an element */    add(t) {
        return this.Ae(this.data.remove(t).Re(t, !0));
    }
    /** Deletes an element */    delete(t) {
        return this.has(t) ? this.Ae(this.data.remove(t)) : this;
    }
    M() {
        return this.data.M();
    }
    ze(t) {
        let e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach(t => {
            e = e.add(t);
        }), e;
    }
    isEqual(t) {
        if (!(t instanceof Qt)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.data.be(), s = t.data.be();
        for (;e.$e(); ) {
            const t = e.Ne().key, i = s.Ne().key;
            if (0 !== this.N(t, i)) return !1;
        }
        return !0;
    }
    W() {
        const t = [];
        return this.forEach(e => {
            t.push(e);
        }), t;
    }
    toString() {
        const t = [];
        return this.forEach(e => t.push(e)), "SortedSet(" + t.toString() + ")";
    }
    Ae(t) {
        const e = new Qt(this.N);
        return e.data = t, e;
    }
}

class Wt {
    constructor(t) {
        this.Ye = t;
    }
    Ne() {
        return this.Ye.Ne().key;
    }
    $e() {
        return this.Ye.$e();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
 */ const jt = new xt(C.N);

function Gt() {
    return jt;
}

function Ht() {
    return Gt();
}

const Kt = new xt(C.N);

function zt() {
    return Kt;
}

const Yt = new xt(C.N);

function Xt() {
    return Yt;
}

const Jt = new Qt(C.N);

function Zt(...t) {
    let e = Jt;
    for (const s of t) e = e.add(s);
    return e;
}

const te = new Qt(Se);

function ee() {
    return te;
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ class se {
    /** The default ordering is by key if the comparator is omitted */
    constructor(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.N = t ? (e, s) => t(e, s) || C.N(e.key, s.key) : (t, e) => C.N(t.key, e.key), 
        this.Xe = zt(), this.Je = new xt(this.N);
    }
    /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */    static Ze(t) {
        return new se(t.N);
    }
    has(t) {
        return null != this.Xe.get(t);
    }
    get(t) {
        return this.Xe.get(t);
    }
    first() {
        return this.Je.Ve();
    }
    last() {
        return this.Je.pe();
    }
    M() {
        return this.Je.M();
    }
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */    indexOf(t) {
        const e = this.Xe.get(t);
        return e ? this.Je.indexOf(e) : -1;
    }
    get size() {
        return this.Je.size;
    }
    /** Iterates documents in order defined by "comparator" */    forEach(t) {
        this.Je.ye((e, s) => (t(e), !1));
    }
    /** Inserts or updates a document with the same key */    add(t) {
        // First remove the element if we have it.
        const e = this.delete(t.key);
        return e.Ae(e.Xe.Re(t.key, t), e.Je.Re(t, null));
    }
    /** Deletes a document with a given key */    delete(t) {
        const e = this.get(t);
        return e ? this.Ae(this.Xe.remove(t), this.Je.remove(e)) : this;
    }
    isEqual(t) {
        if (!(t instanceof se)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.Je.be(), s = t.Je.be();
        for (;e.$e(); ) {
            const t = e.Ne().key, i = s.Ne().key;
            if (!t.isEqual(i)) return !1;
        }
        return !0;
    }
    toString() {
        const t = [];
        return this.forEach(e => {
            t.push(e.toString());
        }), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }
    Ae(t, e) {
        const s = new se;
        return s.N = this.N, s.Xe = t, s.Je = e, s;
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ class ie {
    constructor() {
        this.ts = new xt(C.N);
    }
    track(t) {
        const e = t.doc.key, s = this.ts.get(e);
        s ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === s.type ? this.ts = this.ts.Re(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== s.type ? this.ts = this.ts.Re(e, {
            type: s.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === s.type ? this.ts = this.ts.Re(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === s.type ? this.ts = this.ts.Re(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === s.type ? this.ts = this.ts.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === s.type ? this.ts = this.ts.Re(e, {
            type: 1 /* Removed */ ,
            doc: s.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === s.type ? this.ts = this.ts.Re(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        ye() : this.ts = this.ts.Re(e, t);
    }
    es() {
        const t = [];
        return this.ts.ye((e, s) => {
            t.push(s);
        }), t;
    }
}

class ne {
    constructor(t, e, s, i, n, r, h, o) {
        this.query = t, this.docs = e, this.ss = s, this.docChanges = i, this.ns = n, this.fromCache = r, 
        this.rs = h, this.hs = o;
    }
    /** Returns a view snapshot as if all documents in the snapshot were added. */    static os(t, e, s, i) {
        const n = [];
        return e.forEach(t => {
            n.push({
                type: 0 /* Added */ ,
                doc: t
            });
        }), new ne(t, e, se.Ze(e), n, s, i, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }
    get hasPendingWrites() {
        return !this.ns.M();
    }
    isEqual(t) {
        if (!(this.fromCache === t.fromCache && this.rs === t.rs && this.ns.isEqual(t.ns) && this.query.isEqual(t.query) && this.docs.isEqual(t.docs) && this.ss.isEqual(t.ss))) return !1;
        const e = this.docChanges, s = t.docChanges;
        if (e.length !== s.length) return !1;
        for (let t = 0; t < e.length; t++) if (e[t].type !== s[t].type || !e[t].doc.isEqual(s[t].doc)) return !1;
        return !0;
    }
}

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
/**
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */ class re {
    constructor(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    s, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    i, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    n) {
        this.we = t, this.as = e, this.us = s, this.cs = i, this.ls = n;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
    static _s(t, e) {
        const s = new Map;
        return s.set(t, he.fs(t, e)), new re(y.min(), s, ee(), Gt(), Zt());
    }
}

/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */ class he {
    constructor(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    s, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    i, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    n) {
        this.resumeToken = t, this.ds = e, this.Ts = s, this.ws = i, this.Es = n;
    }
    /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */    static fs(t, e) {
        return new he($.ht, e, Zt(), Zt(), Zt());
    }
}

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
/**
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */ class oe {
    constructor(
    /** The new document applies to all of these targets. */
    t, 
    /** The new document is removed from all of these targets. */
    e, 
    /** The key of the document for this change. */
    s, 
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    i) {
        this.ms = t, this.removedTargetIds = e, this.key = s, this.Is = i;
    }
}

class ae {
    constructor(t, e) {
        this.targetId = t, this.Rs = e;
    }
}

class ue {
    constructor(
    /** What kind of change occurred to the watch target. */
    t, 
    /** The target IDs that were added/removed/set. */
    e, 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    s = $.ht
    /** An RPC error indicating why the watch failed. */ , i = null) {
        this.state = t, this.targetIds = e, this.resumeToken = s, this.cause = i;
    }
}

/** Tracks the internal state of a Watch target. */ class ce {
    constructor() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.As = 0, 
        /**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */
        this.Ps = fe(), 
        /** See public getters for explanations of these fields. */
        this.Vs = $.ht, this.ps = !1, 
        /**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */
        this.ys = !0;
    }
    /**
     * Whether this target has been marked 'current'.
     *
     * 'Current' has special meaning in the RPC protocol: It implies that the
     * Watch backend has sent us all changes up to the point at which the target
     * was added and that the target is consistent with the rest of the watch
     * stream.
     */    get ds() {
        return this.ps;
    }
    /** The last resume token sent to us for this target. */    get resumeToken() {
        return this.Vs;
    }
    /** Whether this target has pending target adds or target removes. */    get gs() {
        return 0 !== this.As;
    }
    /** Whether we have modified any state that should trigger a snapshot. */    get bs() {
        return this.ys;
    }
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */    vs(t) {
        t.rt() > 0 && (this.ys = !0, this.Vs = t);
    }
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */    Ss() {
        let t = Zt(), e = Zt(), s = Zt();
        return this.Ps.forEach((i, n) => {
            switch (n) {
              case 0 /* Added */ :
                t = t.add(i);
                break;

              case 2 /* Modified */ :
                e = e.add(i);
                break;

              case 1 /* Removed */ :
                s = s.add(i);
                break;

              default:
                ye();
            }
        }), new he(this.Vs, this.ps, t, e, s);
    }
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */    Cs() {
        this.ys = !1, this.Ps = fe();
    }
    Ds(t, e) {
        this.ys = !0, this.Ps = this.Ps.Re(t, e);
    }
    Fs(t) {
        this.ys = !0, this.Ps = this.Ps.remove(t);
    }
    Ns() {
        this.As += 1;
    }
    $s() {
        this.As -= 1;
    }
    Ls() {
        this.ys = !0, this.ps = !0;
    }
}

/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */
class le {
    constructor(t) {
        this.ks = t, 
        /** The internal state of all tracked targets. */
        this.Os = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.qs = Gt(), 
        /** A mapping of document keys to their set of target IDs. */
        this.Ms = _e(), 
        /**
         * A list of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */
        this.xs = new Qt(Se);
    }
    /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */    Bs(t) {
        for (const e of t.ms) t.Is instanceof At ? this.Us(e, t.Is) : t.Is instanceof Pt && this.Qs(e, t.key, t.Is);
        for (const e of t.removedTargetIds) this.Qs(e, t.key, t.Is);
    }
    /** Processes and adds the WatchTargetChange to the current set of changes. */    Ws(t) {
        this.js(t, e => {
            const s = this.Gs(e);
            switch (t.state) {
              case 0 /* NoChange */ :
                this.Hs(e) && s.vs(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                s.$s(), s.gs || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                s.Cs(), s.vs(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                s.$s(), s.gs || this.removeTarget(e);
                break;

              case 3 /* Current */ :
                this.Hs(e) && (s.Ls(), s.vs(t.resumeToken));
                break;

              case 4 /* Reset */ :
                this.Hs(e) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                this.Ks(e), s.vs(t.resumeToken));
                break;

              default:
                ye();
            }
        });
    }
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */    js(t, e) {
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Os.forEach((t, s) => {
            this.Hs(s) && e(s);
        });
    }
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */    zs(t) {
        const e = t.targetId, s = t.Rs.count, i = this.Ys(e);
        if (i) {
            const t = i.target;
            if (t.qt()) if (0 === s) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                const s = new C(t.path);
                this.Qs(e, s, new Pt(s, y.min()));
            } else ge(1 === s); else {
                this.Xs(e) !== s && (
                // Existence filter mismatch: We reset the mapping and raise a new
                // snapshot with `isFromCache:true`.
                this.Ks(e), this.xs = this.xs.add(e));
            }
        }
    }
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */    Js(t) {
        const e = new Map;
        this.Os.forEach((s, i) => {
            const n = this.Ys(i);
            if (n) {
                if (s.ds && n.target.qt()) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    const e = new C(n.target.path);
                    null !== this.qs.get(e) || this.Zs(i, e) || this.Qs(i, e, new Pt(e, t));
                }
                s.bs && (e.set(i, s.Ss()), s.Cs());
            }
        });
        let s = Zt();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.Ms.forEach((t, e) => {
            let i = !0;
            e.He(t => {
                const e = this.Ys(t);
                return !e || 2 /* LimboResolution */ === e.Te || (i = !1, !1);
            }), i && (s = s.add(t));
        });
        const i = new re(t, e, this.xs, this.qs, s);
        return this.qs = Gt(), this.Ms = _e(), this.xs = new Qt(Se), i;
    }
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    Us(t, e) {
        if (!this.Hs(t)) return;
        const s = this.Zs(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
        this.Gs(t).Ds(e.key, s), this.qs = this.qs.Re(e.key, e), this.Ms = this.Ms.Re(e.key, this.ti(e.key).add(t));
    }
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    Qs(t, e, s) {
        if (!this.Hs(t)) return;
        const i = this.Gs(t);
        this.Zs(t, e) ? i.Ds(e, 1 /* Removed */) : 
        // The document may have entered and left the target before we raised a
        // snapshot, so we can just ignore the change.
        i.Fs(e), this.Ms = this.Ms.Re(e, this.ti(e).delete(t)), s && (this.qs = this.qs.Re(e, s));
    }
    removeTarget(t) {
        this.Os.delete(t);
    }
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */    Xs(t) {
        const e = this.Gs(t).Ss();
        return this.ks.ei(t).size + e.Ts.size - e.Es.size;
    }
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */    Ns(t) {
        this.Gs(t).Ns();
    }
    Gs(t) {
        let e = this.Os.get(t);
        return e || (e = new ce, this.Os.set(t, e)), e;
    }
    ti(t) {
        let e = this.Ms.get(t);
        return e || (e = new Qt(Se), this.Ms = this.Ms.Re(t, e)), e;
    }
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */    Hs(t) {
        const e = null !== this.Ys(t);
        return e || Pe("WatchChangeAggregator", "Detected inactive target", t), e;
    }
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */    Ys(t) {
        const e = this.Os.get(t);
        return e && e.gs ? null : this.ks.si(t);
    }
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */    Ks(t) {
        this.Os.set(t, new ce), this.ks.ei(t).forEach(e => {
            this.Qs(t, e, /*updatedDocument=*/ null);
        });
    }
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */    Zs(t, e) {
        return this.ks.ei(t).has(e);
    }
}

function _e() {
    return new xt(C.N);
}

function fe() {
    return new xt(C.N);
}

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
 */ const de = (() => {
    const t = {
        asc: "ASCENDING",
        desc: "DESCENDING"
    };
    return t;
})(), Te = (() => {
    const t = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY"
    };
    return t;
})();

/**
 * Generates JsonObject values for the Datastore API suitable for sending to
 * either GRPC stub methods or via the JSON/HTTP REST API.
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
class we {
    constructor(t, e) {
        this.ii = t, this.options = e;
    }
    ni(t) {
        const e = void 0 === t.code ? E.UNKNOWN : Mt(t.code);
        return new m(e, t.message || "");
    }
    /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */    ri(t) {
        return this.options.hi || L(t) ? t : {
            value: t
        };
    }
    /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */    oi(t) {
        let e;
        return e = "object" == typeof t ? t.value : t, L(e) ? null : e;
    }
    /**
     * Returns an IntegerValue for `value`.
     */    lt(t) {
        return {
            integerValue: "" + t
        };
    }
    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */    _t(t) {
        if (this.options.hi) {
            if (isNaN(t)) return {
                doubleValue: "NaN"
            };
            if (t === 1 / 0) return {
                doubleValue: "Infinity"
            };
            if (t === -1 / 0) return {
                doubleValue: "-Infinity"
            };
        }
        return {
            doubleValue: k(t) ? "-0" : t
        };
    }
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */    ai(t) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !k(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
        }
        /**
 * @license
 * Copyright 2020 Google LLC
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
        /**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   TransformMutation (see TransformMutation.applyTo()). They can only exist in
 *   the local view of a document. Therefore they do not need to be parsed or
 *   serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ (t) ? this.lt(t) : this._t(t);
    }
    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */    D(t) {
        if (this.options.hi) {
            return `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + t.seconds,
            nanos: t.nanoseconds
        };
    }
    v(t) {
        const e = H(t);
        return new p(e.seconds, e.nanos);
    }
    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */    ui(t) {
        return this.options.hi ? t.toBase64() : t.toUint8Array();
    }
    /**
     * Returns a ByteString based on the proto string value.
     */    ci(t) {
        return this.options.hi ? (ge(void 0 === t || "string" == typeof t), $.fromBase64String(t || "")) : (ge(void 0 === t || t instanceof Uint8Array), 
        $.fromUint8Array(t || new Uint8Array));
    }
    toVersion(t) {
        return this.D(t.D());
    }
    fromVersion(t) {
        return ge(!!t), y.v(this.v(t));
    }
    li(t, e) {
        return this._i(e || this.ii).child("documents").child(t).j();
    }
    fi(t) {
        const e = b.G(t);
        return ge(Ee(e)), e;
    }
    di(t) {
        return this.li(t.path);
    }
    Z(t) {
        const e = this.fi(t);
        return ge(e.get(1) === this.ii.projectId), ge(!e.get(3) && !this.ii.database || e.get(3) === this.ii.database), 
        new C(this.Ti(e));
    }
    wi(t) {
        return this.li(t);
    }
    Ei(t) {
        const e = this.fi(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
                return 4 === e.length ? b.H : this.Ti(e);
    }
    get mi() {
        return new b([ "projects", this.ii.projectId, "databases", this.ii.database ]).j();
    }
    _i(t) {
        return new b([ "projects", t.projectId, "databases", t.database ]);
    }
    Ti(t) {
        return ge(t.length > 4 && "documents" === t.get(4)), t.L(5);
    }
    /** Creates an api.Document from key and fields (but no create/update time) */    Ii(t, e) {
        return {
            name: this.di(t),
            fields: e.proto.mapValue.fields
        };
    }
    Ri(t) {
        return {
            name: this.di(t.key),
            fields: t.kt().mapValue.fields,
            updateTime: this.D(t.version.D())
        };
    }
    Ai(t, e) {
        const s = this.Z(t.name), i = this.fromVersion(t.updateTime), n = new Et({
            mapValue: {
                fields: t.fields
            }
        });
        return new At(s, i, n, {
            hasCommittedMutations: !!e
        });
    }
    Pi(t) {
        ge(!!t.found), t.found.name, t.found.updateTime;
        const e = this.Z(t.found.name), s = this.fromVersion(t.found.updateTime), i = new Et({
            mapValue: {
                fields: t.found.fields
            }
        });
        return new At(e, s, i, {});
    }
    Vi(t) {
        ge(!!t.missing), ge(!!t.readTime);
        const e = this.Z(t.missing), s = this.fromVersion(t.readTime);
        return new Pt(e, s);
    }
    pi(t) {
        return "found" in t ? this.Pi(t) : "missing" in t ? this.Vi(t) : ye();
    }
    yi(t) {
        let e;
        if ("targetChange" in t) {
            t.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            const s = this.gi(t.targetChange.targetChangeType || "NO_CHANGE"), i = t.targetChange.targetIds || [], n = this.ci(t.targetChange.resumeToken), r = t.targetChange.cause, h = r && this.ni(r);
            e = new ue(s, i, n, h || null);
        } else if ("documentChange" in t) {
            t.documentChange;
            const s = t.documentChange;
            s.document, s.document.name, s.document.updateTime;
            const i = this.Z(s.document.name), n = this.fromVersion(s.document.updateTime), r = new Et({
                mapValue: {
                    fields: s.document.fields
                }
            }), h = new At(i, n, r, {}), o = s.targetIds || [], a = s.removedTargetIds || [];
            e = new oe(o, a, h.key, h);
        } else if ("documentDelete" in t) {
            t.documentDelete;
            const s = t.documentDelete;
            s.document;
            const i = this.Z(s.document), n = s.readTime ? this.fromVersion(s.readTime) : y.min(), r = new Pt(i, n), h = s.removedTargetIds || [];
            e = new oe([], h, r.key, r);
        } else if ("documentRemove" in t) {
            t.documentRemove;
            const s = t.documentRemove;
            s.document;
            const i = this.Z(s.document), n = s.removedTargetIds || [];
            e = new oe([], n, i, null);
        } else {
            if (!("filter" in t)) return ye();
            {
                t.filter;
                const s = t.filter;
                s.targetId;
                const i = s.count || 0, n = new Lt(i), r = s.targetId;
                e = new ae(r, n);
            }
        }
        return e;
    }
    gi(t) {
        return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : ye();
    }
    bi(t) {
        // We have only reached a consistent snapshot for the entire stream if there
        // is a read_time set and it applies to all targets (i.e. the list of
        // targets is empty). The backend is guaranteed to send such responses.
        if (!("targetChange" in t)) return y.min();
        const e = t.targetChange;
        return e.targetIds && e.targetIds.length ? y.min() : e.readTime ? this.fromVersion(e.readTime) : y.min();
    }
    vi(t) {
        let e;
        if (t instanceof _t) e = {
            update: this.Ii(t.key, t.value)
        }; else if (t instanceof Tt) e = {
            delete: this.di(t.key)
        }; else if (t instanceof ft) e = {
            update: this.Ii(t.key, t.data),
            updateMask: this.Si(t.Vt)
        }; else if (t instanceof dt) e = {
            transform: {
                document: this.di(t.key),
                fieldTransforms: t.fieldTransforms.map(t => this.Ci(t))
            }
        }; else {
            if (!(t instanceof wt)) return ye();
            e = {
                verify: this.di(t.key)
            };
        }
        return t.Rt.Tt || (e.currentDocument = this.Di(t.Rt)), e;
    }
    Fi(t) {
        const e = t.currentDocument ? this.Ni(t.currentDocument) : ct.dt();
        if (t.update) {
            t.update.name;
            const s = this.Z(t.update.name), i = new Et({
                mapValue: {
                    fields: t.update.fields
                }
            });
            if (t.updateMask) {
                const n = this.$i(t.updateMask);
                return new ft(s, i, n, e);
            }
            return new _t(s, i, e);
        }
        if (t.delete) {
            const s = this.Z(t.delete);
            return new Tt(s, e);
        }
        if (t.transform) {
            const s = this.Z(t.transform.document), i = t.transform.fieldTransforms.map(t => this.Li(t));
            return ge(!0 === e.exists), new dt(s, i);
        }
        if (t.verify) {
            const s = this.Z(t.verify);
            return new wt(s, e);
        }
        return ye();
    }
    Di(t) {
        return void 0 !== t.updateTime ? {
            updateTime: this.toVersion(t.updateTime)
        } : void 0 !== t.exists ? {
            exists: t.exists
        } : ye();
    }
    Ni(t) {
        return void 0 !== t.updateTime ? ct.updateTime(this.fromVersion(t.updateTime)) : void 0 !== t.exists ? ct.exists(t.exists) : ct.dt();
    }
    ki(t, e) {
        // NOTE: Deletes don't have an updateTime.
        let s = t.updateTime ? this.fromVersion(t.updateTime) : this.fromVersion(e);
        s.isEqual(y.min()) && (
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        s = this.fromVersion(e));
        let i = null;
        return t.transformResults && t.transformResults.length > 0 && (i = t.transformResults), 
        new ut(s, i);
    }
    Oi(t, e) {
        return t && t.length > 0 ? (ge(void 0 !== e), t.map(t => this.ki(t, e))) : [];
    }
    Ci(t) {
        const e = t.transform;
        if (e instanceof st) return {
            fieldPath: t.field.j(),
            setToServerValue: "REQUEST_TIME"
        };
        if (e instanceof it) return {
            fieldPath: t.field.j(),
            appendMissingElements: {
                values: e.elements
            }
        };
        if (e instanceof nt) return {
            fieldPath: t.field.j(),
            removeAllFromArray: {
                values: e.elements
            }
        };
        if (e instanceof rt) return {
            fieldPath: t.field.j(),
            increment: e.ct
        };
        throw ye();
    }
    Li(t) {
        let e = null;
        if ("setToServerValue" in t) ge("REQUEST_TIME" === t.setToServerValue), e = st.instance; else if ("appendMissingElements" in t) {
            const s = t.appendMissingElements.values || [];
            e = new it(s);
        } else if ("removeAllFromArray" in t) {
            const s = t.removeAllFromArray.values || [];
            e = new nt(s);
        } else "increment" in t ? e = new rt(this, t.increment) : ye();
        const s = S.J(t.fieldPath);
        return new at(s, e);
    }
    qi(t) {
        return {
            documents: [ this.wi(t.path) ]
        };
    }
    Mi(t) {
        ge(1 === t.documents.length);
        const e = t.documents[0];
        return yt.Wt(this.Ei(e)).ee();
    }
    xi(t) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, s = t.path;
        null !== t.collectionGroup ? (e.parent = this.wi(s), e.structuredQuery.from = [ {
            collectionId: t.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = this.wi(s.k()), e.structuredQuery.from = [ {
            collectionId: s.q()
        } ]);
        const i = this.Bi(t.filters);
        i && (e.structuredQuery.where = i);
        const n = this.Ui(t.orderBy);
        n && (e.structuredQuery.orderBy = n);
        const r = this.ri(t.limit);
        return null !== r && (e.structuredQuery.limit = r), t.startAt && (e.structuredQuery.startAt = this.Qi(t.startAt)), 
        t.endAt && (e.structuredQuery.endAt = this.Qi(t.endAt)), e;
    }
    Wi(t) {
        let e = this.Ei(t.parent);
        const s = t.structuredQuery, i = s.from ? s.from.length : 0;
        let n = null;
        if (i > 0) {
            ge(1 === i);
            const t = s.from[0];
            t.allDescendants ? n = t.collectionId : e = e.child(t.collectionId);
        }
        let r = [];
        s.where && (r = this.ji(s.where));
        let h = [];
        s.orderBy && (h = this.Gi(s.orderBy));
        let o = null;
        s.limit && (o = this.oi(s.limit));
        let a = null;
        s.startAt && (a = this.Hi(s.startAt));
        let u = null;
        return s.endAt && (u = this.Hi(s.endAt)), new yt(e, n, h, r, o, "F" /* First */ , a, u).ee();
    }
    Ki(t) {
        const e = this.zi(t.Te);
        return null == e ? null : {
            "goog-listen-tags": e
        };
    }
    zi(t) {
        switch (t) {
          case 0 /* Listen */ :
            return null;

          case 1 /* ExistenceFilterMismatch */ :
            return "existence-filter-mismatch";

          case 2 /* LimboResolution */ :
            return "limbo-document";

          default:
            return ye();
        }
    }
    ee(t) {
        let e;
        const s = t.target;
        return e = s.qt() ? {
            documents: this.qi(s)
        } : {
            query: this.xi(s)
        }, e.targetId = t.targetId, t.resumeToken.rt() > 0 && (e.resumeToken = this.ui(t.resumeToken)), 
        e;
    }
    Bi(t) {
        if (0 === t.length) return;
        const e = t.map(t => t instanceof gt ? this.Yi(t) : ye());
        return 1 === e.length ? e[0] : {
            compositeFilter: {
                op: "AND",
                filters: e
            }
        };
    }
    ji(t) {
        return t ? void 0 !== t.unaryFilter ? [ this.Xi(t) ] : void 0 !== t.fieldFilter ? [ this.Ji(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map(t => this.ji(t)).reduce((t, e) => t.concat(e)) : ye() : [];
    }
    Ui(t) {
        if (0 !== t.length) return t.map(t => this.Zi(t));
    }
    Gi(t) {
        return t.map(t => this.tn(t));
    }
    Qi(t) {
        return {
            before: t.before,
            values: t.position
        };
    }
    Hi(t) {
        const e = !!t.before, s = t.values || [];
        return new Ft(s, e);
    }
    // visible for testing
    en(t) {
        return de[t];
    }
    // visible for testing
    sn(t) {
        switch (t) {
          case "ASCENDING":
            return "asc" /* ASCENDING */;

          case "DESCENDING":
            return "desc" /* DESCENDING */;

          default:
            return;
        }
    }
    // visible for testing
    nn(t) {
        return Te[t];
    }
    rn(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          case "OPERATOR_UNSPECIFIED":
          default:
            return ye();
        }
    }
    hn(t) {
        return {
            fieldPath: t.j()
        };
    }
    on(t) {
        return S.J(t.fieldPath);
    }
    // visible for testing
    Zi(t) {
        return {
            field: this.hn(t.field),
            direction: this.en(t.dir)
        };
    }
    tn(t) {
        return new Nt(this.on(t.field), this.sn(t.direction));
    }
    Ji(t) {
        return gt.create(this.on(t.fieldFilter.field), this.rn(t.fieldFilter.op), t.fieldFilter.value);
    }
    // visible for testing
    Yi(t) {
        if ("==" /* EQUAL */ === t.op) {
            if (tt(t.value)) return {
                unaryFilter: {
                    field: this.hn(t.field),
                    op: "IS_NAN"
                }
            };
            if (Z(t.value)) return {
                unaryFilter: {
                    field: this.hn(t.field),
                    op: "IS_NULL"
                }
            };
        }
        return {
            fieldFilter: {
                field: this.hn(t.field),
                op: this.nn(t.op),
                value: t.value
            }
        };
    }
    Xi(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            const e = this.on(t.unaryFilter.field);
            return gt.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            const s = this.on(t.unaryFilter.field);
            return gt.create(s, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "OPERATOR_UNSPECIFIED":
          default:
            return ye();
        }
    }
    Si(t) {
        const e = [];
        return t.fields.forEach(t => e.push(t.j())), {
            fieldPaths: e
        };
    }
    $i(t) {
        const e = t.fieldPaths || [];
        return new ot(e.map(t => S.J(t)));
    }
}

function Ee(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}

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
/**
 * Provides singleton helpers where setup code can inject a platform at runtime.
 * setPlatform needs to be set before Firestore is used and must be set exactly
 * once.
 */ class me {
    static an(t) {
        me.platform && ye(), me.platform = t;
    }
    static nt() {
        return me.platform || ye(), me.platform;
    }
}

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
 */ const Ie = new e("@firebase/firestore");

// Helper methods are needed because variables can't be exported as read/write
function Re() {
    return Ie.logLevel;
}

function Ae(t) {
    Ie.logLevel = t;
}

function Pe(t, ...e) {
    if (Ie.logLevel <= s.DEBUG) {
        const s = e.map(pe);
        Ie.debug(`Firestore (${T}): ${t}`, ...s);
    }
}

function Ve(t, ...e) {
    if (Ie.logLevel <= s.ERROR) {
        const s = e.map(pe);
        Ie.error(`Firestore (${T}): ${t}`, ...s);
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function pe(t) {
    if ("string" == typeof t) return t;
    {
        const e = me.nt();
        try {
            return e.un(t);
        } catch (e) {
            // Converting to JSON failed, just log the object directly
            return t;
        }
    }
}

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
/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function ye(t = "Unexpected state") {
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    const e = `FIRESTORE (${T}) INTERNAL ASSERTION FAILED: ` + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw Ve(e), new Error(e);
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */ function ge(t, e) {
    t || ye();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function be(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
}

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
 */ class ve {
    static cn() {
        // Alphanumeric characters
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
        // The largest byte value that is a multiple of `char.length`.
                let s = "";
        for (;s.length < 20; ) {
            const i = me.nt().ln(40);
            for (let n = 0; n < i.length; ++n) 
            // Only accept values that are [0, maxMultiple), this ensures they can
            // be evenly mapped to indices of `chars` via a modulo operation.
            s.length < 20 && i[n] < e && (s += t.charAt(i[n] % t.length));
        }
        return s;
    }
}

function Se(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function Ce(t, e, s) {
    return t.length === e.length && t.every((t, i) => s(t, e[i]));
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
 */ class De {
    /**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId The database to use.
     * @param persistenceKey A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host The Firestore backend host to connect to.
     * @param ssl Whether to use SSL when connecting.
     * @param forceLongPolling Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     */
    constructor(t, e, s, i, n) {
        this.ii = t, this.persistenceKey = e, this.host = s, this.ssl = i, this.forceLongPolling = n;
    }
}

/** The default database name for a project. */
/** Represents the database ID a Firestore client is associated with. */
class Fe {
    constructor(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    get _n() {
        return "(default)" === this.database;
    }
    isEqual(t) {
        return t instanceof Fe && t.projectId === this.projectId && t.database === this.database;
    }
    S(t) {
        return Se(this.projectId, t.projectId) || Se(this.database, t.database);
    }
}

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
/**
 * A map implementation that uses objects as keys. Objects must implement the
 * Equatable interface and must be immutable. Entries in the map are stored
 * together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */ class Ne {
    constructor(t) {
        this.fn = t, 
        /**
         * The inner map for a key -> value pair. Due to the possibility of
         * collisions we keep a list of entries that we do a linear search through
         * to find an actual match. Note that collisions should be rare, so we still
         * expect near constant time lookups in practice.
         */
        this.dn = {};
    }
    /** Get a value for this key, or undefined if it does not exist. */    get(t) {
        const e = this.fn(t), s = this.dn[e];
        if (void 0 !== s) for (const [e, i] of s) if (e.isEqual(t)) return i;
    }
    has(t) {
        return void 0 !== this.get(t);
    }
    /** Put this key and value in the map. */    set(t, e) {
        const s = this.fn(t), i = this.dn[s];
        if (void 0 !== i) {
            for (let s = 0; s < i.length; s++) if (i[s][0].isEqual(t)) return void (i[s] = [ t, e ]);
            i.push([ t, e ]);
        } else this.dn[s] = [ [ t, e ] ];
    }
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */    delete(t) {
        const e = this.fn(t), s = this.dn[e];
        if (void 0 === s) return !1;
        for (let i = 0; i < s.length; i++) if (s[i][0].isEqual(t)) return 1 === s.length ? delete this.dn[e] : s.splice(i, 1), 
        !0;
        return !1;
    }
    forEach(t) {
        F(this.dn, (e, s) => {
            for (const [e, i] of s) t(e, i);
        });
    }
    M() {
        return N(this.dn);
    }
}

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
/**
 * A batch of mutations that will be sent as one unit to the backend.
 */
class $e {
    /**
     * @param batchId The unique ID of this mutation batch.
     * @param localWriteTime The original write time of this mutation.
     * @param baseMutations Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    constructor(t, e, s, i) {
        this.batchId = t, this.Tn = e, this.baseMutations = s, this.mutations = i;
    }
    /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to create a new remote document
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     * @param batchResult The result of applying the MutationBatch to the
     * backend.
     */    at(t, e, s) {
        const i = s.wn;
        for (let s = 0; s < this.mutations.length; s++) {
            const n = this.mutations[s];
            if (n.key.isEqual(t)) {
                const t = i[s];
                e = n.at(e, t);
            }
        }
        return e;
    }
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param docKey The key of the document to apply mutations to.
     * @param maybeDoc The document to apply mutations to.
     */    ot(t, e) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (const s of this.baseMutations) s.key.isEqual(t) && (e = s.ot(e, e, this.Tn));
        const s = e;
        // Second, apply all user-provided mutations.
                for (const i of this.mutations) i.key.isEqual(t) && (e = i.ot(e, s, this.Tn));
        return e;
    }
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */    En(t) {
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
        let e = t;
        return this.mutations.forEach(s => {
            const i = this.ot(s.key, t.get(s.key));
            i && (e = e.Re(s.key, i));
        }), e;
    }
    keys() {
        return this.mutations.reduce((t, e) => t.add(e.key), Zt());
    }
    isEqual(t) {
        return this.batchId === t.batchId && Ce(this.mutations, t.mutations, (t, e) => t.isEqual(e)) && Ce(this.baseMutations, t.baseMutations, (t, e) => t.isEqual(e));
    }
}

/** The result of applying a mutation batch to the backend. */ class Le {
    constructor(t, e, s, i, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    n) {
        this.batch = t, this.mn = e, this.wn = s, this.streamToken = i, this.In = n;
    }
    /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=>version mapping (docVersions).
     */    static from(t, e, s, i) {
        ge(t.mutations.length === s.length);
        let n = Xt();
        const r = t.mutations;
        for (let t = 0; t < r.length; t++) n = n.Re(r[t].key, s[t].version);
        return new Le(t, e, s, i, n);
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * PersistencePromise<> is essentially a re-implementation of Promise<> except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise<> implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */ class ke {
    constructor(t) {
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
        this.Rn = null, this.An = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.Pn = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.Vn = !1, t(t => {
            this.Pn = !0, this.result = t, this.Rn && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            this.Rn(t);
        }, t => {
            this.Pn = !0, this.error = t, this.An && this.An(t);
        });
    }
    catch(t) {
        return this.next(void 0, t);
    }
    next(t, e) {
        return this.Vn && ye(), this.Vn = !0, this.Pn ? this.error ? this.pn(e, this.error) : this.yn(t, this.result) : new ke((s, i) => {
            this.Rn = e => {
                this.yn(t, e).next(s, i);
            }, this.An = t => {
                this.pn(e, t).next(s, i);
            };
        });
    }
    gn() {
        return new Promise((t, e) => {
            this.next(t, e);
        });
    }
    bn(t) {
        try {
            const e = t();
            return e instanceof ke ? e : ke.resolve(e);
        } catch (t) {
            return ke.reject(t);
        }
    }
    yn(t, e) {
        return t ? this.bn(() => t(e)) : ke.resolve(e);
    }
    pn(t, e) {
        return t ? this.bn(() => t(e)) : ke.reject(e);
    }
    static resolve(t) {
        return new ke((e, s) => {
            e(t);
        });
    }
    static reject(t) {
        return new ke((e, s) => {
            s(t);
        });
    }
    static vn(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t) {
        return new ke((e, s) => {
            let i = 0, n = 0, r = !1;
            t.forEach(t => {
                ++i, t.next(() => {
                    ++n, r && n === i && e();
                }, t => s(t));
            }), r = !0, n === i && e();
        });
    }
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */    static Sn(t) {
        let e = ke.resolve(!1);
        for (const s of t) e = e.next(t => t ? ke.resolve(t) : s());
        return e;
    }
    static forEach(t, e) {
        const s = [];
        return t.forEach((t, i) => {
            s.push(e.call(this, t, i));
        }), this.vn(s);
    }
}

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
/**
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */
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
/**
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */
class Oe {
    constructor(t, e, s) {
        this.Cn = t, this.Dn = e, this.Fn = s;
    }
    /**
     * Get the local view of the document identified by `key`.
     *
     * @return Local view of the document or null if we don't have any cached
     * state for it.
     */    Nn(t, e) {
        return this.Dn.$n(t, e).next(s => this.Ln(t, e, s));
    }
    /** Internal version of `getDocument` that allows reusing batches. */    Ln(t, e, s) {
        return this.Cn.kn(t, e).next(t => {
            for (const i of s) t = i.ot(e, t);
            return t;
        });
    }
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    On(t, e, s) {
        let i = Ht();
        return e.forEach((t, e) => {
            for (const i of s) e = i.ot(t, e);
            i = i.Re(t, e);
        }), i;
    }
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */    qn(t, e) {
        return this.Cn.getEntries(t, e).next(e => this.Mn(t, e));
    }
    /**
     * Similar to `getDocuments`, but creates the local view from the given
     * `baseDocs` without retrieving documents from the local store.
     */    Mn(t, e) {
        return this.Dn.xn(t, e).next(s => {
            const i = this.On(t, e, s);
            let n = Gt();
            return i.forEach((t, e) => {
                // TODO(http://b/32275378): Don't conflate missing / deleted.
                e || (e = new Pt(t, y.min())), n = n.Re(t, e);
            }), n;
        });
    }
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction The persistence transaction.
     * @param query The query to match documents against.
     * @param sinceReadTime If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */    Bn(t, e, s) {
        return e.qt() ? this.Un(t, e.path) : e.le() ? this.Qn(t, e, s) : this.Wn(t, e, s);
    }
    Un(t, e) {
        // Just do a simple document lookup.
        return this.Nn(t, new C(e)).next(t => {
            let e = zt();
            return t instanceof At && (e = e.Re(t.key, t)), e;
        });
    }
    Qn(t, e, s) {
        const i = e.collectionGroup;
        let n = zt();
        return this.Fn.jn(t, i).next(r => ke.forEach(r, r => {
            const h = e.Zt(r.child(i));
            return this.Wn(t, h, s).next(t => {
                t.forEach((t, e) => {
                    n = n.Re(t, e);
                });
            });
        }).next(() => n));
    }
    Wn(t, e, s) {
        // Query the remote documents and overlay mutations.
        let i, n;
        return this.Cn.Bn(t, e, s).next(s => (i = s, this.Dn.Gn(t, e))).next(e => (n = e, 
        this.Hn(t, n, i).next(t => {
            i = t;
            for (const t of n) for (const e of t.mutations) {
                const s = e.key, n = i.get(s), r = e.ot(n, n, t.Tn);
                i = r instanceof At ? i.Re(s, r) : i.remove(s);
            }
        }))).next(() => (
        // Finally, filter out any documents that don't actually match
        // the query.
        i.forEach((t, s) => {
            e.matches(s) || (i = i.remove(t));
        }), i));
    }
    Hn(t, e, s) {
        let i = Zt();
        for (const t of e) for (const e of t.mutations) e instanceof ft && null === s.get(e.key) && (i = i.add(e.key));
        let n = s;
        return this.Cn.getEntries(t, i).next(t => (t.forEach((t, e) => {
            null !== e && e instanceof At && (n = n.Re(t, e));
        }), n));
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */ class qe {
    constructor(t, e, s, i) {
        this.targetId = t, this.fromCache = e, this.Kn = s, this.zn = i;
    }
    static Yn(t, e) {
        let s = Zt(), i = Zt();
        for (const t of e.docChanges) switch (t.type) {
          case 0 /* Added */ :
            s = s.add(t.doc.key);
            break;

          case 1 /* Removed */ :
            i = i.add(t.doc.key);
 // do nothing
                }
        return new qe(t, e.fromCache, s, i);
    }
}

/**
 * @license
 * Copyright 2018 Google Inc.
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
/**
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */ class Me {
    constructor(t, e) {
        this.previousValue = t, e && (e.Xn = t => this.Jn(t), this.Zn = t => e.tr(t));
    }
    Jn(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }
    next() {
        const t = ++this.previousValue;
        return this.Zn && this.Zn(t), t;
    }
}

Me.er = -1;

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
class xe {
    constructor() {
        this.promise = new Promise((t, e) => {
            this.resolve = t, this.reject = e;
        });
    }
}

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
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
class Be {
    constructor(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    s = 1e3
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , i = 1.5
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , n = 6e4) {
        this.sr = t, this.ir = e, this.nr = s, this.rr = i, this.hr = n, this.or = 0, this.ar = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.ur = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    reset() {
        this.or = 0;
    }
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */    cr() {
        this.or = this.hr;
    }
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */    lr(t) {
        // Cancel any pending backoff operation.
        this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        const e = Math.floor(this.or + this._r()), s = Math.max(0, Date.now() - this.ur), i = Math.max(0, e - s);
        // Guard against lastAttemptTime being in the future due to a clock change.
                i > 0 && Pe("ExponentialBackoff", `Backing off for ${i} ms ` + `(base delay: ${this.or} ms, ` + `delay with jitter: ${e} ms, ` + `last attempt: ${s} ms ago)`), 
        this.ar = this.sr.dr(this.ir, i, () => (this.ur = Date.now(), t())), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this.or *= this.rr, this.or < this.nr && (this.or = this.nr), this.or > this.hr && (this.or = this.hr);
    }
    cancel() {
        null !== this.ar && (this.ar.cancel(), this.ar = null);
    }
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    _r() {
        return (Math.random() - .5) * this.or;
    }
}

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
/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 */
class Ue {
    constructor(t, e, s, i, n) {
        this.Tr = t, this.ir = e, this.wr = s, this.op = i, this.Er = n, this.mr = new xe, 
        this.then = this.mr.promise.then.bind(this.mr.promise), this.catch = this.mr.promise.catch.bind(this.mr.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.mr.promise.catch(t => {});
    }
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue The queue to schedule the operation on.
     * @param id A Timer ID identifying the type of operation this is.
     * @param delayMs The delay (ms) before the operation should be scheduled.
     * @param op The operation to run.
     * @param removalCallback A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */    static Ir(t, e, s, i, n) {
        const r = Date.now() + s, h = new Ue(t, e, r, i, n);
        return h.start(s), h;
    }
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */    start(t) {
        this.Rr = setTimeout(() => this.Ar(), t);
    }
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */    Pr() {
        return this.Ar();
    }
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */    cancel(t) {
        null !== this.Rr && (this.clearTimeout(), this.mr.reject(new m(E.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }
    Ar() {
        this.Tr.Vr(() => null !== this.Rr ? (this.clearTimeout(), this.op().then(t => this.mr.resolve(t))) : Promise.resolve());
    }
    clearTimeout() {
        null !== this.Rr && (this.Er(this), clearTimeout(this.Rr), this.Rr = null);
    }
}

class Qe {
    constructor() {
        // The last promise in the queue.
        this.pr = Promise.resolve(), 
        // The last retryable operation. Retryable operation are run in order and
        // retried with backoff.
        this.yr = Promise.resolve(), 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.gr = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.br = [], 
        // visible for testing
        this.vr = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Sr = !1, 
        // List of TimerIds to fast-forward delays for.
        this.Cr = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.Dr = new Be(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Fr = () => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.Nr("async_queue_retry" /* AsyncQueueRetry */);
        };
        const t = me.nt().window;
        t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Fr);
    }
    // Is this AsyncQueue being shut down? If true, this instance will not enqueue
    // any new operations, Promises from enqueue requests will not resolve.
    get $r() {
        return this.gr;
    }
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */    Vr(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue without waiting for it to complete (i.e. we ignore the Promise result).
     */    Lr(t) {
        this.kr(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Or(t);
    }
    /**
     * Regardless if the queue has initialized shutdown, adds a new operation to the
     * queue.
     */    qr(t) {
        return this.kr(), this.Or(t);
    }
    /**
     * Adds a new operation to the queue and initialize the shut down of this queue.
     * Returns a promise that will be resolved when the promise returned by the new
     * operation is (with its value).
     * Once this method is called, the only possible way to request running an operation
     * is through `enqueueAndForgetEvenAfterShutdown`.
     */    async Mr(t) {
        if (this.kr(), !this.gr) {
            this.gr = !0;
            const e = me.nt().window;
            e && e.removeEventListener("visibilitychange", this.Fr), await this.qr(t);
        }
    }
    /**
     * Adds a new operation to the queue. Returns a promise that will be resolved
     * when the promise returned by the new operation is (with its value).
     */    enqueue(t) {
        return this.kr(), this.gr ? new Promise(t => {}) : this.Or(t);
    }
    /**
     * Enqueue a retryable operation.
     *
     * A retryable operation is rescheduled with backoff if it fails with a
     * IndexedDbTransactionError (the error type used by SimpleDb). All
     * retryable operations are executed in order and only run if all prior
     * operations were retried successfully.
     */    xr(t) {
        this.kr(), this.gr || (this.yr = this.yr.then(() => {
            const e = new xe, s = async () => {
                try {
                    await t(), e.resolve(), this.Dr.reset();
                } catch (t) {
                    if ("IndexedDbTransactionError" !== t.name) throw e.resolve(), t;
 // Failure will be handled by AsyncQueue
                                        Pe("AsyncQueue", "Operation failed with retryable error: " + t), 
                    this.Dr.lr(s);
                }
            };
            return this.Vr(s), e.promise;
        }));
    }
    Or(t) {
        const e = this.pr.then(() => (this.Sr = !0, t().catch(t => {
            // Re-throw the error so that this.tail becomes a rejected Promise and
            // all further attempts to chain (via .then) will just short-circuit
            // and return the rejected Promise.
            throw this.vr = t, this.Sr = !1, Ve("INTERNAL UNHANDLED ERROR: ", t.stack || t.message || ""), 
            t;
        }).then(t => (this.Sr = !1, t))));
        return this.pr = e, e;
    }
    /**
     * Schedules an operation to be queued on the AsyncQueue once the specified
     * `delayMs` has elapsed. The returned CancelablePromise can be used to cancel
     * the operation prior to its running.
     */    dr(t, e, s) {
        this.kr(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.Cr.indexOf(t) > -1 && (e = 0);
        const i = Ue.Ir(this, t, e, s, t => this.Br(t));
        return this.br.push(i), i;
    }
    kr() {
        this.vr && ye();
    }
    /**
     * Verifies there's an operation currently in-progress on the AsyncQueue.
     * Unfortunately we can't verify that the running code is in the promise chain
     * of that operation, so this isn't a foolproof check, but it should be enough
     * to catch some bugs.
     */    Ur() {}
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */    async Qr() {
        // Operations in the queue prior to draining may have enqueued additional
        // operations. Keep draining the queue until the tail is no longer advanced,
        // which indicates that no more new operations were enqueued and that all
        // operations were executed.
        let t;
        do {
            t = this.pr, await t;
        } while (t !== this.pr);
    }
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */    Wr(t) {
        for (const e of this.br) if (e.ir === t) return !0;
        return !1;
    }
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId Delayed operations up to and including this TimerId will
     *  be drained. Throws if no such operation exists. Pass TimerId.All to run
     *  all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */    Nr(t) {
        // Note that draining may generate more delayed ops, so we do that first.
        return this.Qr().then(() => {
            // Run ops in the same order they'd run if they ran naturally.
            this.br.sort((t, e) => t.wr - e.wr);
            for (const e of this.br) if (e.Pr(), "all" /* All */ !== t && e.ir === t) break;
            return this.Qr();
        });
    }
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */    jr(t) {
        this.Cr.push(t);
    }
    /** Called once a DelayedOperation is run or canceled. */    Br(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        const e = this.br.indexOf(t);
        this.br.splice(e, 1);
    }
}

/**
 * @license
 * Copyright 2018 Google LLC
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
 */ class We {
    constructor(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    s) {
        this.Gr = t, this.Hr = e, this.Kr = s;
    }
    static zr(t) {
        return new We(t, We.Yr, We.Xr);
    }
}

We.Jr = -1, We.Zr = 1048576, We.th = 41943040, We.Yr = 10, We.Xr = 1e3, We.eh = new We(We.th, We.Yr, We.Xr), 
We.DISABLED = new We(We.Jr, 0, 0);

/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */
class je {
    constructor(t) {
        this.sh = t;
    }
    next() {
        return this.sh += 2, this.sh;
    }
    static ih() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new je(0);
    }
    static nh() {
        // Sync engine assigns target IDs for limbo document detection.
        return new je(-1);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
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
/**
 * An in-memory implementation of IndexManager.
 */ class Ge {
    constructor() {
        this.rh = new He;
    }
    hh(t, e) {
        return this.rh.add(e), ke.resolve();
    }
    jn(t, e) {
        return ke.resolve(this.rh.getEntries(e));
    }
}

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */ class He {
    constructor() {
        this.index = {};
    }
    // Returns false if the entry already existed.
    add(t) {
        const e = t.q(), s = t.k(), i = this.index[e] || new Qt(b.N), n = !i.has(s);
        return this.index[e] = i.add(s), n;
    }
    has(t) {
        const e = t.q(), s = t.k(), i = this.index[e];
        return i && i.has(s);
    }
    getEntries(t) {
        return (this.index[t] || new Qt(b.N)).W();
    }
}

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
/**
 * Local storage in the Firestore client. Coordinates persistence components
 * like the mutation queue and remote document cache to present a
 * latency-compensated view of stored data.
 *
 * The LocalStore is responsible for accepting mutations from the Sync Engine.
 * Writes from the client are put into a queue as provisional Mutations until
 * they are processed by the RemoteStore and confirmed as having been written
 * to the server.
 *
 * The local store provides the local version of documents that have been
 * modified locally. It maintains the constraint:
 *
 *   LocalDocument = RemoteDocument + Active(LocalMutations)
 *
 * (Active mutations are those that are enqueued and have not been previously
 * acknowledged or rejected).
 *
 * The RemoteDocument ("ground truth") state is provided via the
 * applyChangeBatch method. It will be some version of a server-provided
 * document OR will be a server-provided document PLUS acknowledged mutations:
 *
 *   RemoteDocument' = RemoteDocument + Acknowledged(LocalMutations)
 *
 * Note that this "dirty" version of a RemoteDocument will not be identical to a
 * server base version, since it has LocalMutations added to it pending getting
 * an authoritative copy from the server.
 *
 * Since LocalMutations can be rejected by the server, we have to be able to
 * revert a LocalMutation that has already been applied to the LocalDocument
 * (typically done by replaying all remaining LocalMutations to the
 * RemoteDocument to re-apply).
 *
 * The LocalStore is responsible for the garbage collection of the documents it
 * contains. For now, it every doc referenced by a view, the mutation queue, or
 * the RemoteStore.
 *
 * It also maintains the persistence of mapping queries to resume tokens and
 * target ids. It needs to know this data about queries to properly know what
 * docs it would be allowed to garbage collect.
 *
 * The LocalStore must be able to efficiently execute queries against its local
 * cache of the documents, to provide the initial set of results before any
 * remote changes have been received.
 *
 * Note: In TypeScript, most methods return Promises since the implementation
 * may rely on fetching data from IndexedDB which is async.
 * These Promises will only be rejected on an I/O error or other internal
 * (unexpected) failure (e.g. failed assert) and always represent an
 * unrecoverable error (should be caught / reported by the async_queue).
 */
class Ke {
    constructor(
    /** Manages our in-memory or durable persistence. */
    t, e, s) {
        this.persistence = t, this.oh = e, 
        /**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */
        this.ah = new xt(Se), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.uh = new Ne(t => t.canonicalId()), 
        /**
         * The read time of the last entry processed by `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */
        this.lh = y.min(), this.Dn = t._h(s), this.fh = t.dh(), this.Th = t.wh(), this.Eh = new Oe(this.fh, this.Dn, this.persistence.mh()), 
        this.oh.Ih(this.Eh);
    }
    /** Starts the LocalStore. */    start() {
        return Promise.resolve();
    }
    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    async Rh(t) {
        let e = this.Dn, s = this.Eh;
        const i = await this.persistence.runTransaction("Handle user change", "readonly", i => {
            // Swap out the mutation queue, grabbing the pending mutation batches
            // before and after.
            let n;
            return this.Dn.Ah(i).next(r => (n = r, e = this.persistence._h(t), 
            // Recreate our LocalDocumentsView using the new
            // MutationQueue.
            s = new Oe(this.fh, e, this.persistence.mh()), e.Ah(i))).next(t => {
                const e = [], r = [];
                // Union the old/new changed keys.
                let h = Zt();
                for (const t of n) {
                    e.push(t.batchId);
                    for (const e of t.mutations) h = h.add(e.key);
                }
                for (const e of t) {
                    r.push(e.batchId);
                    for (const t of e.mutations) h = h.add(t.key);
                }
                // Return the set of all (potentially) changed documents and the list
                // of mutation batch IDs that were affected by change.
                                return s.qn(i, h).next(t => ({
                    Ph: t,
                    Vh: e,
                    ph: r
                }));
            });
        });
        return this.Dn = e, this.Eh = s, this.oh.Ih(this.Eh), i;
    }
    /* Accept locally generated Mutations and commit them to storage. */    yh(t) {
        const e = p.now(), s = t.reduce((t, e) => t.add(e.key), Zt());
        let i;
        return this.persistence.runTransaction("Locally write mutations", "readwrite", n => this.Eh.qn(n, s).next(s => {
            i = s;
            // For non-idempotent mutations (such as `FieldValue.increment()`),
            // we record the base state in a separate patch mutation. This is
            // later used to guarantee consistent values and prevents flicker
            // even if the backend sends us an update that already includes our
            // transform.
            const r = [];
            for (const e of t) {
                const t = e.Pt(i.get(e.key));
                null != t && 
                // NOTE: The base state should only be applied if there's some
                // existing document to override, so use a Precondition of
                // exists=true
                r.push(new ft(e.key, t, It(t.proto.mapValue), ct.exists(!0)));
            }
            return this.Dn.gh(n, e, r, t);
        })).then(t => {
            const e = t.En(i);
            return {
                batchId: t.batchId,
                bh: e
            };
        });
    }
    /**
     * Acknowledge the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */    vh(t) {
        return this.persistence.runTransaction("Acknowledge batch", "readwrite-primary", e => {
            const s = t.batch.keys(), i = this.fh.Sh({
                Ch: !0
            });
            return this.Dn.vh(e, t.batch, t.streamToken).next(() => this.Dh(e, t, i)).next(() => i.apply(e)).next(() => this.Dn.Fh(e)).next(() => this.Eh.qn(e, s));
        });
    }
    /**
     * Remove mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */    Nh(t) {
        return this.persistence.runTransaction("Reject batch", "readwrite-primary", e => {
            let s;
            return this.Dn.$h(e, t).next(t => (ge(null !== t), s = t.keys(), this.Dn.Lh(e, t))).next(() => this.Dn.Fh(e)).next(() => this.Eh.qn(e, s));
        });
    }
    /**
     * Returns the largest (latest) batch id in mutation queue that is pending server response.
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */    kh() {
        return this.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", t => this.Dn.kh(t));
    }
    /** Returns the last recorded stream token for the current user. */    Oh() {
        return this.persistence.runTransaction("Get last stream token", "readonly", t => this.Dn.Oh(t));
    }
    /**
     * Sets the stream token for the current user without acknowledging any
     * mutation batch. This is usually only useful after a stream handshake or in
     * response to an error that requires clearing the stream token.
     */    qh(t) {
        return this.persistence.runTransaction("Set last stream token", "readwrite-primary", e => this.Dn.qh(e, t));
    }
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */    Mh() {
        return this.persistence.runTransaction("Get last remote snapshot version", "readonly", t => this.Th.Mh(t));
    }
    /**
     * Update the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */    xh(t) {
        const e = t.we;
        let s = this.ah;
        return this.persistence.runTransaction("Apply remote event", "readwrite-primary", i => {
            const n = this.fh.Sh({
                Ch: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                        s = this.ah;
            const r = [];
            t.as.forEach((t, n) => {
                const h = s.get(n);
                if (!h) return;
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                                r.push(this.Th.Bh(i, t.Es, n).next(() => this.Th.Uh(i, t.Ts, n)));
                const o = t.resumeToken;
                // Update the resume token if the change includes one.
                                if (o.rt() > 0) {
                    const a = h.me(o, e).Ee(i.Qh);
                    s = s.Re(n, a), 
                    // Update the target data if there are target changes (or if
                    // sufficient time has passed since the last update).
                    Ke.Wh(h, a, t) && r.push(this.Th.jh(i, a));
                }
            });
            let h = Gt(), o = Zt();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
            if (t.cs.forEach((t, e) => {
                o = o.add(t);
            }), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            r.push(n.getEntries(i, o).next(s => {
                t.cs.forEach((o, a) => {
                    const u = s.get(o);
                    // Note: The order of the steps below is important, since we want
                    // to ensure that rejected limbo resolutions (which fabricate
                    // NoDocuments with SnapshotVersion.min()) never add documents to
                    // cache.
                                        a instanceof Pt && a.version.isEqual(y.min()) ? (
                    // NoDocuments with SnapshotVersion.min() are used in manufactured
                    // events. We remove these documents from cache since we lost
                    // access.
                    n.Gh(o, e), h = h.Re(o, a)) : null == u || a.version.S(u.version) > 0 || 0 === a.version.S(u.version) && u.hasPendingWrites ? (n.Hh(a, e), 
                    h = h.Re(o, a)) : Pe("LocalStore", "Ignoring outdated watch update for ", o, ". Current version:", u.version, " Watch version:", a.version), 
                    t.ls.has(o) && r.push(this.persistence.zh.Kh(i, o));
                });
            })), !e.isEqual(y.min())) {
                const t = this.Th.Mh(i).next(t => this.Th.Yh(i, i.Qh, e));
                r.push(t);
            }
            return ke.vn(r).next(() => n.apply(i)).next(() => this.Eh.Mn(i, h));
        }).then(t => (this.ah = s, t));
    }
    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */    static Wh(t, e, s) {
        // Always persist target data if we don't already have a resume token.
        if (ge(e.resumeToken.rt() > 0), 0 === t.resumeToken.rt()) return !0;
        // Don't allow resume token changes to be buffered indefinitely. This
        // allows us to be reasonably up-to-date after a crash and avoids needing
        // to loop over all active queries on shutdown. Especially in the browser
        // we may not get time to do anything interesting while the current tab is
        // closing.
                return e.we.C() - t.we.C() >= this.Xh || s.Ts.size + s.ws.size + s.Es.size > 0;
        // Otherwise if the only thing that has changed about a target is its resume
        // token it's not worth persisting. Note that the RemoteStore keeps an
        // in-memory view of the currently active targets which includes the current
        // resume token, so stream failure or user changes will still use an
        // up-to-date resume token regardless of what we do here.
        }
    /**
     * Notify local store of the changed views to locally pin documents.
     */    Jh(t) {
        return this.persistence.runTransaction("notifyLocalViewChanges", "readwrite", e => ke.forEach(t, t => ke.forEach(t.Kn, s => this.persistence.zh.Zh(e, t.targetId, s)).next(() => ke.forEach(t.zn, s => this.persistence.zh.to(e, t.targetId, s))))).then(() => {
            for (const e of t) {
                const t = e.targetId;
                if (!e.fromCache) {
                    const e = this.ah.get(t), s = e.we, i = e.Ie(s);
                    // Advance the last limbo free snapshot version
                                        this.ah = this.ah.Re(t, i);
                }
            }
        });
    }
    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */    eo(t) {
        return this.persistence.runTransaction("Get next mutation batch", "readonly", e => (void 0 === t && (t = -1), 
        this.Dn.so(e, t)));
    }
    /**
     * Read the current value of a Document with a given key or null if not
     * found - used for testing.
     */    io(t) {
        return this.persistence.runTransaction("read document", "readonly", e => this.Eh.Nn(e, t));
    }
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */    no(t) {
        return this.persistence.runTransaction("Allocate target", "readwrite", e => {
            let s;
            return this.Th.ro(e, t).next(i => i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            s = i, ke.resolve(s)) : this.Th.ho(e).next(i => (s = new $t(t, i, 0 /* Listen */ , e.Qh), 
            this.Th.oo(e, s).next(() => s))));
        }).then(e => (null === this.ah.get(e.targetId) && (this.ah = this.ah.Re(e.targetId, e), 
        this.uh.set(t, e.targetId)), e));
    }
    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    ro(t, e) {
        const s = this.uh.get(e);
        return void 0 !== s ? ke.resolve(this.ah.get(s)) : this.Th.ro(t, e);
    }
    /**
     * Unpin all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    ao(t, e) {
        const s = this.ah.get(t), i = e ? "readwrite" : "readwrite-primary";
        return this.persistence.runTransaction("Release target", i, t => e ? ke.resolve() : this.persistence.zh.removeTarget(t, s)).then(() => {
            this.ah = this.ah.remove(t), this.uh.delete(s.target);
        });
    }
    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults Whether results from previous executions can
     * be used to optimize this query execution.
     */    uo(t, e) {
        let s = y.min(), i = Zt();
        return this.persistence.runTransaction("Execute query", "readonly", n => this.ro(n, t.ee()).next(t => {
            if (t) return s = t.lastLimboFreeSnapshotVersion, this.Th.co(n, t.targetId).next(t => {
                i = t;
            });
        }).next(() => this.oh.Bn(n, t, e ? s : y.min(), e ? i : Zt())).next(t => ({
            documents: t,
            lo: i
        })));
    }
    Dh(t, e, s) {
        const i = e.batch, n = i.keys();
        let r = ke.resolve();
        return n.forEach(n => {
            r = r.next(() => s.kn(t, n)).next(t => {
                let r = t;
                const h = e.In.get(n);
                ge(null !== h), (!r || r.version.S(h) < 0) && (r = i.at(n, r, e), r && 
                // We use the commitVersion as the readTime rather than the
                // document's updateTime since the updateTime is not advanced
                // for updates that do not modify the underlying document.
                s.Hh(r, e.mn));
            });
        }), r.next(() => this.Dn.Lh(t, i));
    }
    _o(t) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", e => t.fo(e, this.ah));
    }
}

/**
 * The maximum time to leave a resume token buffered without writing it out.
 * This value is arbitrary: it's long enough to avoid several writes
 * (possibly indefinitely if updates come more frequently than this) but
 * short enough that restarting after crashing will still have a pretty
 * recent resume token.
 */
/**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err An error returned by a LocalStore operation.
 * @return A Promise that resolves after we recovered, or the original error.
 */
async function ze(t) {
    if (t.code !== E.FAILED_PRECONDITION || "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab." !== t.message) throw t;
    Pe("LocalStore", "Unexpectedly lost primary lease");
}

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
/**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */ Ke.Xh = 3e8;

class Ye {
    constructor() {
        // A set of outstanding references to a document sorted by key.
        this.do = new Qt(Xe.To), 
        // A set of outstanding references to a document sorted by target id.
        this.wo = new Qt(Xe.Eo);
    }
    /** Returns true if the reference set contains no references. */    M() {
        return this.do.M();
    }
    /** Adds a reference to the given document key for the given ID. */    Zh(t, e) {
        const s = new Xe(t, e);
        this.do = this.do.add(s), this.wo = this.wo.add(s);
    }
    /** Add references to the given document keys for the given ID. */    mo(t, e) {
        t.forEach(t => this.Zh(t, e));
    }
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */    to(t, e) {
        this.Io(new Xe(t, e));
    }
    Ro(t, e) {
        t.forEach(t => this.to(t, e));
    }
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */    Ao(t) {
        const e = C.EMPTY, s = new Xe(e, t), i = new Xe(e, t + 1), n = [];
        return this.wo.Ge([ s, i ], t => {
            this.Io(t), n.push(t.key);
        }), n;
    }
    Po() {
        this.do.forEach(t => this.Io(t));
    }
    Io(t) {
        this.do = this.do.delete(t), this.wo = this.wo.delete(t);
    }
    Vo(t) {
        const e = C.EMPTY, s = new Xe(e, t), i = new Xe(e, t + 1);
        let n = Zt();
        return this.wo.Ge([ s, i ], t => {
            n = n.add(t.key);
        }), n;
    }
    po(t) {
        const e = new Xe(t, 0), s = this.do.Ke(e);
        return null !== s && t.isEqual(s.key);
    }
}

class Xe {
    constructor(t, e) {
        this.key = t, this.yo = e;
    }
    /** Compare by key then by ID */    static To(t, e) {
        return C.N(t.key, e.key) || Se(t.yo, e.yo);
    }
    /** Compare by ID then by key */    static Eo(t, e) {
        return Se(t.yo, e.yo) || C.N(t.key, e.key);
    }
}

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
/**
 * Validates that no arguments were passed in the invocation of functionName.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateNoArgs('myFunction', arguments);
 */ function Je(t, e) {
    if (0 !== e.length) throw new m(E.INVALID_ARGUMENT, `Function ${t}() does not support arguments, ` + "but was called with " + ws(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has the exact number of arguments.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateExactNumberOfArgs('myFunction', arguments, 2);
 */ function Ze(t, e, s) {
    if (e.length !== s) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires ` + ws(s, "argument") + ", but was called with " + ws(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has at least the provided number of
 * arguments (but can have many more).
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
 */ function ts(t, e, s) {
    if (e.length < s) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires at least ` + ws(s, "argument") + ", but was called with " + ws(e.length, "argument") + ".");
}

/**
 * Validates the invocation of functionName has number of arguments between
 * the values provided.
 *
 * Forward the magic "arguments" variable as second parameter on which the
 * parameter validation is performed:
 * validateBetweenNumberOfArgs('myFunction', arguments, 2, 3);
 */ function es(t, e, s, i) {
    if (e.length < s || e.length > i) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires between ${s} and ` + `${i} arguments, but was called with ` + ws(e.length, "argument") + ".");
}

/**
 * Validates the provided argument is an array and has as least the expected
 * number of elements.
 */
/**
 * Validates the provided positional argument has the native JavaScript type
 * using typeof checks.
 */
function ss(t, e, s, i) {
    as(t, e, `${Ts(s)} argument`, i);
}

/**
 * Validates the provided argument has the native JavaScript type using
 * typeof checks or is undefined.
 */ function is(t, e, s, i) {
    void 0 !== i && ss(t, e, s, i);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks.
 */ function ns(t, e, s, i) {
    as(t, e, `${s} option`, i);
}

/**
 * Validates the provided named option has the native JavaScript type using
 * typeof checks or is undefined.
 */ function rs(t, e, s, i) {
    void 0 !== i && ns(t, e, s, i);
}

function hs(t, e, s, i, n) {
    void 0 !== i && function(t, e, s, i, n) {
        if (!(i instanceof Array)) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires its ${e} ` + `option to be an array, but it was: ${cs(i)}`);
        for (let r = 0; r < i.length; ++r) if (!n(i[r])) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires all ${e} ` + `elements to be ${s}, but the value at index ${r} ` + `was: ${cs(i[r])}`);
    }(t, e, s, i, n);
}

/**
 * Validates that the provided named option equals one of the expected values.
 */
/**
 * Validates that the provided named option equals one of the expected values or
 * is undefined.
 */
function os(t, e, s, i, n) {
    void 0 !== i && function(t, e, s, i, n) {
        const r = [];
        for (const t of n) {
            if (t === i) return;
            r.push(cs(t));
        }
        const h = cs(i);
        throw new m(E.INVALID_ARGUMENT, `Invalid value ${h} provided to function ${t}() for option ` + `"${s}". Acceptable values: ${r.join(", ")}`);
    }(t, 0, s, i, n);
}

/**
 * Validates that the provided argument is a valid enum.
 *
 * @param functionName Function making the validation call.
 * @param enums Array containing all possible values for the enum.
 * @param position Position of the argument in `functionName`.
 * @param argument Argument to validate.
 * @return The value as T if the argument can be converted.
 */
/** Helper to validate the type of a provided input. */
function as(t, e, s, i) {
    let n = !1;
    if (n = "object" === e ? us(i) : "non-empty string" === e ? "string" == typeof i && "" !== i : typeof i === e, 
    !n) {
        const n = cs(i);
        throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires its ${s} ` + `to be of type ${e}, but it was: ${n}`);
    }
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */ function us(t) {
    return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
}

/** Returns a string describing the type / value of the provided input. */ function cs(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        {
            const e = 
            /** Hacky method to try to get the constructor name for an object. */
            function(t) {
                if (t.constructor) {
                    const e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                    if (e && e.length > 1) return e[1];
                }
                return null;
            }
            /** Validates the provided argument is defined. */ (t);
            return e ? `a custom ${e} object` : "an object";
        }
    }
    return "function" == typeof t ? "a function" : ye();
}

function ls(t, e, s) {
    if (void 0 === s) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires a valid ${Ts(e)} ` + "argument, but it was undefined.");
}

/**
 * Validates the provided positional argument is an object, and its keys and
 * values match the expected keys and types provided in optionTypes.
 */ function _s(t, e, s) {
    F(e, (e, i) => {
        if (s.indexOf(e) < 0) throw new m(E.INVALID_ARGUMENT, `Unknown option '${e}' passed to function ${t}(). ` + "Available options: " + s.join(", "));
    });
}

/**
 * Helper method to throw an error that the provided argument did not pass
 * an instanceof check.
 */ function fs(t, e, s, i) {
    const n = cs(i);
    return new m(E.INVALID_ARGUMENT, `Function ${t}() requires its ${Ts(s)} ` + `argument to be a ${e}, but it was: ${n}`);
}

function ds(t, e, s) {
    if (s <= 0) throw new m(E.INVALID_ARGUMENT, `Function "${t}()" requires its ${Ts(e)} argument to be a positive number, but it was: ${s}.`);
}

/** Converts a number to its english word representation */ function Ts(t) {
    switch (t) {
      case 1:
        return "first";

      case 2:
        return "second";

      case 3:
        return "third";

      default:
        return t + "th";
    }
}

/**
 * Formats the given word as plural conditionally given the preceding number.
 */ function ws(t, e) {
    return `${t} ${e}` + (1 === t ? "" : "s");
}

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
/** Helper function to assert Uint8Array is available at runtime. */ function Es() {
    if ("undefined" == typeof Uint8Array) throw new m(E.UNIMPLEMENTED, "Uint8Arrays are not available in this environment.");
}

/** Helper function to assert Base64 functions are available at runtime. */ function ms() {
    if (!me.nt().bo) throw new m(E.UNIMPLEMENTED, "Blobs are unavailable in Firestore in this environment.");
}

/**
 * Immutable class holding a blob (binary data).
 * This class is directly exposed in the public API.
 *
 * Note that while you can't hide the constructor in JavaScript code, we are
 * using the hack above to make sure no-one outside this module can call it.
 */ class Is {
    constructor(t) {
        ms(), this.vo = t;
    }
    static fromBase64String(t) {
        Ze("Blob.fromBase64String", arguments, 1), ss("Blob.fromBase64String", "string", 1, t), 
        ms();
        try {
            return new Is($.fromBase64String(t));
        } catch (t) {
            throw new m(E.INVALID_ARGUMENT, "Failed to construct Blob from Base64 string: " + t);
        }
    }
    static fromUint8Array(t) {
        if (Ze("Blob.fromUint8Array", arguments, 1), Es(), !(t instanceof Uint8Array)) throw fs("Blob.fromUint8Array", "Uint8Array", 1, t);
        return new Is($.fromUint8Array(t));
    }
    toBase64() {
        return Ze("Blob.toBase64", arguments, 0), ms(), this.vo.toBase64();
    }
    toUint8Array() {
        return Ze("Blob.toUint8Array", arguments, 0), Es(), this.vo.toUint8Array();
    }
    toString() {
        return "Blob(base64: " + this.toBase64() + ")";
    }
    isEqual(t) {
        return this.vo.isEqual(t.vo);
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
// The objects that are a part of this API are exposed to third-parties as
// compiled javascript so we want to flag our private members with a leading
// underscore to discourage their use.
/**
 * A FieldPath refers to a field in a document. The path may consist of a single
 * field name (referring to a top-level field in the document), or a list of
 * field names (referring to a nested field in the document).
 */ class Rs {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    constructor(...t) {
        !function(t, e, s, i) {
            if (!(e instanceof Array) || e.length < i) throw new m(E.INVALID_ARGUMENT, `Function ${t}() requires its ${s} argument to be an ` + "array with at least " + `${ws(i, "element")}.`);
        }("FieldPath", t, "fieldNames", 1);
        for (let e = 0; e < t.length; ++e) if (ss("FieldPath", "string", e, t[e]), 0 === t[e].length) throw new m(E.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this.So = new S(t);
    }
    static documentId() {
        return Rs.Co;
    }
    isEqual(t) {
        if (!(t instanceof Rs)) throw fs("isEqual", "FieldPath", 1, t);
        return this.So.isEqual(t.So);
    }
}

/**
 * Internal Note: The backend doesn't technically support querying by
 * document ID. Instead it queries by the entire document name (full path
 * included), but in the cases we currently support documentId(), the net
 * effect is the same.
 */ Rs.Co = new Rs(S.X().j());

/**
 * Matches any characters in a field path string that are reserved.
 */
const As = new RegExp("[~\\*/\\[\\]]");

/**
 * Parses a field path string into a FieldPath, treating dots as separators.
 */
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
/**
 * An opaque base class for FieldValue sentinel objects in our public API,
 * with public static methods for creating said sentinel objects.
 */
class Ps {
    constructor(t) {
        this.Do = t;
    }
}

class Vs extends Ps {
    constructor() {
        super("FieldValue.delete");
    }
    Ci(t) {
        if (2 /* MergeSet */ !== t.Fo) throw 1 /* Update */ === t.Fo ? t.No("FieldValue.delete() can only appear at the top level of your update data") : t.No("FieldValue.delete() cannot be used with set() unless you pass {merge:true}");
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
        return t.Vt.push(t.path), null;
    }
    isEqual(t) {
        return t instanceof Vs;
    }
}

class ps extends Ps {
    constructor() {
        super("FieldValue.serverTimestamp");
    }
    Ci(t) {
        return new at(t.path, st.instance);
    }
    isEqual(t) {
        return t instanceof ps;
    }
}

class ys extends Ps {
    constructor(t) {
        super("FieldValue.arrayUnion"), this.$o = t;
    }
    Ci(t) {
        // Although array transforms are used with writes, the actual elements
        // being uniomed or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        const e = new Ns({
            Fo: 3 /* Argument */ ,
            methodName: this.Do,
            Lo: !0
        }, t.ii, t.serializer), s = this.$o.map(t => Ls(t, e)), i = new it(s);
        return new at(t.path, i);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class gs extends Ps {
    constructor(t) {
        super("FieldValue.arrayRemove"), this.$o = t;
    }
    Ci(t) {
        // Although array transforms are used with writes, the actual elements
        // being unioned or removed are not considered writes since they cannot
        // contain any FieldValue sentinels, etc.
        const e = new Ns({
            Fo: 3 /* Argument */ ,
            methodName: this.Do,
            Lo: !0
        }, t.ii, t.serializer), s = this.$o.map(t => Ls(t, e)), i = new nt(s);
        return new at(t.path, i);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class bs extends Ps {
    constructor(t) {
        super("FieldValue.increment"), this.ko = t;
    }
    Ci(t) {
        const e = new Ns({
            Fo: 3 /* Argument */ ,
            methodName: this.Do
        }, t.ii, t.serializer), s = Ls(this.ko, e), i = new rt(t.serializer, s);
        return new at(t.path, i);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * Immutable class representing a geo point as latitude-longitude pair.
 * This class is directly exposed in the public API, including its constructor.
 */
class vs {
    constructor(t, e) {
        if (Ze("GeoPoint", arguments, 2), ss("GeoPoint", "number", 1, t), ss("GeoPoint", "number", 2, e), 
        !isFinite(t) || t < -90 || t > 90) throw new m(E.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new m(E.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this.Oo = t, this.qo = e;
    }
    /**
     * Returns the latitude of this geo point, a number between -90 and 90.
     */    get latitude() {
        return this.Oo;
    }
    /**
     * Returns the longitude of this geo point, a number between -180 and 180.
     */    get longitude() {
        return this.qo;
    }
    isEqual(t) {
        return this.Oo === t.Oo && this.qo === t.qo;
    }
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */    g(t) {
        return Se(this.Oo, t.Oo) || Se(this.qo, t.qo);
    }
}

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
 */ const Ss = /^__.*__$/;

/** The result of parsing document data (e.g. for a setData call). */ class Cs {
    constructor(t, e, s) {
        this.data = t, this.Vt = e, this.fieldTransforms = s;
    }
    Mo(t, e) {
        const s = [];
        return null !== this.Vt ? s.push(new ft(t, this.data, this.Vt, e)) : s.push(new _t(t, this.data, e)), 
        this.fieldTransforms.length > 0 && s.push(new dt(t, this.fieldTransforms)), s;
    }
}

/** The result of parsing "update" data (i.e. for an updateData call). */ class Ds {
    constructor(t, e, s) {
        this.data = t, this.Vt = e, this.fieldTransforms = s;
    }
    Mo(t, e) {
        const s = [ new ft(t, this.data, this.Vt, e) ];
        return this.fieldTransforms.length > 0 && s.push(new dt(t, this.fieldTransforms)), 
        s;
    }
}

function Fs(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw ye();
    }
}

/** A "context" object passed around while parsing user data. */ class Ns {
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
    constructor(t, e, s, i, n) {
        this.settings = t, this.ii = e, this.serializer = s, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.xo(), this.fieldTransforms = i || [], this.Vt = n || [];
    }
    get path() {
        return this.settings.path;
    }
    get Fo() {
        return this.settings.Fo;
    }
    /** Returns a new context with the specified settings overwritten. */    Bo(t) {
        return new Ns(Object.assign(Object.assign({}, this.settings), t), this.ii, this.serializer, this.fieldTransforms, this.Vt);
    }
    Uo(t) {
        var e;
        const s = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), i = this.Bo({
            path: s,
            Lo: !1
        });
        return i.Qo(t), i;
    }
    Wo(t) {
        var e;
        const s = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), i = this.Bo({
            path: s,
            Lo: !1
        });
        return i.xo(), i;
    }
    jo(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.Bo({
            path: void 0,
            Lo: !0
        });
    }
    No(t) {
        const e = !this.path || this.path.M() ? "" : ` (found in field ${this.path.toString()})`;
        return new m(E.INVALID_ARGUMENT, `Function ${this.settings.methodName}() called with invalid data. ` + t + e);
    }
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
        return void 0 !== this.Vt.find(e => t.B(e)) || void 0 !== this.fieldTransforms.find(e => t.B(e.field));
    }
    xo() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (let t = 0; t < this.path.length; t++) this.Qo(this.path.get(t));
    }
    Qo(t) {
        if (0 === t.length) throw this.No("Document fields must not be empty");
        if (Fs(this.Fo) && Ss.test(t)) throw this.No('Document fields cannot begin and end with "__"');
    }
}

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ class $s {
    constructor(t, e) {
        this.ii = t, this.serializer = e || me.nt().Go(t);
    }
    /** Parse document data from a non-merge set() call. */    Ho(t, e) {
        const s = this.Ko(0 /* Set */ , t);
        qs("Data must be an object, but it was:", s, e);
        const i = ks(e, s);
        return new Cs(new Et(i), 
        /* fieldMask= */ null, s.fieldTransforms);
    }
    /** Parse document data from a set() call with '{merge:true}'. */    zo(t, e, s) {
        const i = this.Ko(2 /* MergeSet */ , t);
        qs("Data must be an object, but it was:", i, e);
        const n = ks(e, i);
        let r, h;
        if (s) {
            const e = [];
            for (const n of s) {
                let s;
                if (n instanceof Rs) s = n.So; else {
                    if ("string" != typeof n) throw ye();
                    s = xs(t, n);
                }
                if (!i.contains(s)) throw new m(E.INVALID_ARGUMENT, `Field '${s}' is specified in your field mask but missing from your input data.`);
                Bs(e, s) || e.push(s);
            }
            r = new ot(e), h = i.fieldTransforms.filter(t => r.ft(t.field));
        } else r = new ot(i.Vt), h = i.fieldTransforms;
        return new Cs(new Et(n), r, h);
    }
    /** Parse update data from an update() call. */    Yo(t, e) {
        const s = this.Ko(1 /* Update */ , t);
        qs("Data must be an object, but it was:", s, e);
        const i = [], n = new mt;
        F(e, (e, r) => {
            const h = xs(t, e), o = s.Wo(h);
            if (r instanceof Vs) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(h); else {
                const t = Ls(r, o);
                null != t && (i.push(h), n.set(h, t));
            }
        });
        const r = new ot(i);
        return new Ds(n.gt(), r, s.fieldTransforms);
    }
    /** Parse update data from a list of field/value arguments. */    Xo(t, e, s, i) {
        const n = this.Ko(1 /* Update */ , t), r = [ Ms(t, e) ], h = [ s ];
        if (i.length % 2 != 0) throw new m(E.INVALID_ARGUMENT, `Function ${t}() needs to be called with an even number ` + "of arguments that alternate between field names and values.");
        for (let e = 0; e < i.length; e += 2) r.push(Ms(t, i[e])), h.push(i[e + 1]);
        const o = [], a = new mt;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = r.length - 1; t >= 0; --t) if (!Bs(o, r[t])) {
            const e = r[t], s = h[t], i = n.Wo(e);
            if (s instanceof Vs) 
            // Add it to the field mask, but don't add anything to updateData.
            o.push(e); else {
                const t = Ls(s, i);
                null != t && (o.push(e), a.set(e, t));
            }
        }
        const u = new ot(o);
        return new Ds(a.gt(), u, n.fieldTransforms);
    }
    /** Creates a new top-level parse context. */    Ko(t, e) {
        return new Ns({
            Fo: t,
            methodName: e,
            path: S.H,
            Lo: !1
        }, this.ii, this.serializer);
    }
    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */    Jo(t, e, s = !1) {
        return Ls(e, this.Ko(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , t));
    }
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input Data to be parsed.
 * @param context A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @return The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function Ls(t, e) {
    if (Os(t)) return qs("Unsupported field value:", e, t), ks(t, e);
    if (t instanceof Ps) 
    // FieldValues usually parse into transforms (except FieldValue.delete())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!Fs(e.Fo)) throw e.No(`${t.Do}() can only be used with update() and set()`);
        if (null === e.path) throw e.No(`${t.Do}() is not currently supported inside arrays`);
        const s = t.Ci(e);
        s && e.fieldTransforms.push(s);
    }
    /**
 * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
 *
 * @return The parsed value
 */ (t, e), null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.Vt.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.Lo && 4 /* ArrayArgument */ !== e.Fo) throw e.No("Nested arrays are not supported");
        return function(t, e) {
            const s = [];
            let i = 0;
            for (const n of t) {
                let t = Ls(n, e.jo(i));
                null == t && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                t = {
                    nullValue: "NULL_VALUE"
                }), s.push(t), i++;
            }
            return {
                arrayValue: {
                    values: s
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === t) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return e.serializer.ai(t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            const s = p.fromDate(t);
            return {
                timestampValue: e.serializer.D(s)
            };
        }
        if (t instanceof p) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            const s = new p(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: e.serializer.D(s)
            };
        }
        if (t instanceof vs) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Is) return {
            bytesValue: e.serializer.ui(t)
        };
        if (t instanceof pi) {
            const s = e.ii, i = t.firestore.Zo;
            if (!i.isEqual(s)) throw e.No("Document reference is for database " + `${i.projectId}/${i.database} but should be ` + `for database ${s.projectId}/${s.database}`);
            return {
                referenceValue: e.serializer.li(t.ta.path, t.firestore.Zo)
            };
        }
        throw e.No(`Unsupported field value: ${cs(t)}`);
    }
    /**
 * Checks whether an object looks like a JSON object that should be converted
 * into a struct. Normal class/prototype instances are considered to look like
 * JSON objects since they should be converted to a struct value. Arrays, Dates,
 * GeoPoints, etc. are not considered to look like JSON objects since they map
 * to specific FieldValue types other than ObjectValue.
 */ (t, e);
}

function ks(t, e) {
    const s = {};
    return N(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.Vt.push(e.path) : F(t, (t, i) => {
        const n = Ls(i, e.Uo(t));
        null != n && (s[t] = n);
    }), {
        mapValue: {
            fields: s
        }
    };
}

function Os(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof p || t instanceof vs || t instanceof Is || t instanceof pi || t instanceof Ps);
}

function qs(t, e, s) {
    if (!Os(s) || !us(s)) {
        const i = cs(s);
        throw "an object" === i ? e.No(t + " a custom object") : e.No(t + " " + i);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function Ms(t, e) {
    if (e instanceof Rs) return e.So;
    if ("string" == typeof e) return xs(t, e);
    throw new m(E.INVALID_ARGUMENT, `Function ${t}() called with invalid data. ${"Field path arguments must be of type string or FieldPath."}`);
}

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName The publicly visible method name
 * @param path The dot-separated string form of a field path which will be split
 * on dots.
 */ function xs(t, e) {
    try {
        return function(t) {
            if (t.search(As) >= 0) throw new m(E.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not contain ` + "'~', '*', '/', '[', or ']'");
            try {
                return new Rs(...t.split("."));
            } catch (e) {
                throw new m(E.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, ` + "begin with '.', end with '.', or contain '..'");
            }
        }(e).So;
    } catch (e) {
        const i = (s = e) instanceof Error ? s.message : s.toString();
        throw new m(E.INVALID_ARGUMENT, `Function ${t}() called with invalid data. ${i}`);
    }
    /**
 * Extracts the message from a caught exception, which should be an Error object
 * though JS doesn't guarantee that.
 */
    var s;
    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

function Bs(t, e) {
    return t.some(t => t.isEqual(e));
}

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
/**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */
class Us {
    constructor(t, e, s, i, n, r) {
        this.sr = t, this.ea = s, this.sa = i, this.ia = n, this.listener = r, this.state = 0 /* Initial */ , 
        /**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */
        this.na = 0, this.ra = null, this.stream = null, this.Dr = new Be(t, e);
    }
    /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */    ha() {
        return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
    }
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */    oa() {
        return 2 /* Open */ === this.state;
    }
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */    start() {
        3 /* Error */ !== this.state ? this.auth() : this.aa();
    }
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */    async stop() {
        this.ha() && await this.close(0 /* Initial */);
    }
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */    ua() {
        this.state = 0 /* Initial */ , this.Dr.reset();
    }
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */    ca() {
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
        this.oa() && null === this.ra && (this.ra = this.sr.dr(this.ea, 6e4, () => this.la()));
    }
    /** Sends a message to the underlying stream. */    _a(t) {
        this.fa(), this.stream.send(t);
    }
    /** Called by the idle timer when the stream should close due to inactivity. */    async la() {
        if (this.oa()) 
        // When timing out an idle stream there's no reason to force the stream into backoff when
        // it restarts so set the stream state to Initial instead of Error.
        return this.close(0 /* Initial */);
    }
    /** Marks the stream as active again. */    fa() {
        this.ra && (this.ra.cancel(), this.ra = null);
    }
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState the intended state of the stream after closing.
     * @param error the error the connection was closed with.
     */    async close(t, e) {
        // Cancel any outstanding timers (they're guaranteed not to execute).
        this.fa(), this.Dr.cancel(), 
        // Invalidates any stream-related callbacks (e.g. from auth or the
        // underlying stream), guaranteeing they won't execute.
        this.na++, 3 /* Error */ !== t ? 
        // If this is an intentional close ensure we don't delay our next connection attempt.
        this.Dr.reset() : e && e.code === E.RESOURCE_EXHAUSTED ? (
        // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
        Ve(e.toString()), Ve("Using maximum backoff delay to prevent overloading the backend."), 
        this.Dr.cr()) : e && e.code === E.UNAUTHENTICATED && 
        // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
        // just expired.
        this.ia.l(), 
        // Clean up the underlying stream because we are no longer interested in events.
        null !== this.stream && (this.da(), this.stream.close(), this.stream = null), 
        // This state must be assigned before calling onClose() to allow the callback to
        // inhibit backoff or otherwise manipulate the state in its non-started state.
        this.state = t, 
        // Notify the listener that the stream closed.
        await this.listener.Ta(e);
    }
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */    da() {}
    auth() {
        this.state = 1 /* Starting */;
        const t = this.wa(this.na), e = this.na;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                this.ia.getToken().then(t => {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            this.na === e && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            this.Ea(t);
        }, e => {
            t(() => {
                const t = new m(E.UNKNOWN, "Fetching auth token failed: " + e.message);
                return this.ma(t);
            });
        });
    }
    Ea(t) {
        const e = this.wa(this.na);
        this.stream = this.Ia(t), this.stream.Ra(() => {
            e(() => (this.state = 2 /* Open */ , this.listener.Ra()));
        }), this.stream.Ta(t => {
            e(() => this.ma(t));
        }), this.stream.onMessage(t => {
            e(() => this.onMessage(t));
        });
    }
    aa() {
        this.state = 4 /* Backoff */ , this.Dr.lr(async () => {
            this.state = 0 /* Initial */ , this.start();
        });
    }
    // Visible for tests
    ma(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return Pe("PersistentStream", `close with error: ${t}`), this.stream = null, this.close(3 /* Error */ , t);
    }
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */    wa(t) {
        return e => {
            this.sr.Vr(() => this.na === t ? e() : (Pe("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
            Promise.resolve()));
        };
    }
}

/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */ class Qs extends Us {
    constructor(t, e, s, i, n) {
        super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , e, s, n), 
        this.serializer = i;
    }
    Ia(t) {
        return this.sa.Aa("Listen", t);
    }
    onMessage(t) {
        // A successful response means the stream is healthy
        this.Dr.reset();
        const e = this.serializer.yi(t), s = this.serializer.bi(t);
        return this.listener.Pa(e, s);
    }
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */    Va(t) {
        const e = {};
        e.database = this.serializer.mi, e.addTarget = this.serializer.ee(t);
        const s = this.serializer.Ki(t);
        s && (e.labels = s), this._a(e);
    }
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */    pa(t) {
        const e = {};
        e.database = this.serializer.mi, e.removeTarget = t, this._a(e);
    }
}

/**
 * A Stream that implements the Write RPC.
 *
 * The Write RPC requires the caller to maintain special streamToken
 * state in between calls, to help the server understand which responses the
 * client has processed by the time the next request is made. Every response
 * will contain a streamToken; this value must be passed to the next
 * request.
 *
 * After calling start() on this stream, the next request must be a handshake,
 * containing whatever streamToken is on hand. Once a response to this
 * request is received, all pending mutations may be submitted. When
 * submitting multiple batches of mutations at the same time, it's
 * okay to use the same streamToken for the calls to writeMutations.
 *
 * TODO(b/33271235): Use proto types
 */ class Ws extends Us {
    constructor(t, e, s, i, n) {
        super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , e, s, n), 
        this.serializer = i, this.ya = !1, 
        /**
         * The last received stream token from the server, used to acknowledge which
         * responses the client has processed. Stream tokens are opaque checkpoint
         * markers whose only real value is their inclusion in the next request.
         *
         * PersistentWriteStream manages propagating this value from responses to the
         * next request.
         */
        this.lastStreamToken = $.ht;
    }
    /**
     * Tracks whether or not a handshake has been successfully exchanged and
     * the stream is ready to accept mutations.
     */    get ga() {
        return this.ya;
    }
    // Override of PersistentStream.start
    start() {
        this.ya = !1, super.start();
    }
    da() {
        this.ya && this.ba([]);
    }
    Ia(t) {
        return this.sa.Aa("Write", t);
    }
    onMessage(t) {
        if (
        // Always capture the last stream token.
        ge(!!t.streamToken), this.lastStreamToken = this.serializer.ci(t.streamToken), this.ya) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.Dr.reset();
            const e = this.serializer.Oi(t.writeResults, t.commitTime), s = this.serializer.fromVersion(t.commitTime);
            return this.listener.va(s, e);
        }
        // The first response is always the handshake response
        return ge(!t.writeResults || 0 === t.writeResults.length), this.ya = !0, this.listener.Sa();
    }
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */    Ca() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        const t = {};
        t.database = this.serializer.mi, this._a(t);
    }
    /** Sends a group of mutations to the Firestore backend to apply. */    ba(t) {
        const e = {
            streamToken: this.serializer.ui(this.lastStreamToken),
            writes: t.map(t => this.serializer.vi(t))
        };
        this._a(e);
    }
}

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
/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
class js extends class {
    constructor() {
        // Make sure that the structural type of `Datastore` is unique.
        // See https://github.com/microsoft/TypeScript/issues/5451
        this.Da = void 0;
    }
} {
    constructor(t, e, s) {
        super(), this.sa = t, this.credentials = e, this.serializer = s;
    }
    /** Gets an auth token and invokes the provided RPC. */    Fa(t, e) {
        return this.credentials.getToken().then(s => this.sa.Fa(t, e, s)).catch(t => {
            throw t.code === E.UNAUTHENTICATED && this.credentials.l(), t;
        });
    }
    /** Gets an auth token and invokes the provided RPC with streamed results. */    Na(t, e) {
        return this.credentials.getToken().then(s => this.sa.Na(t, e, s)).catch(t => {
            throw t.code === E.UNAUTHENTICATED && this.credentials.l(), t;
        });
    }
}

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
/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
class Gs {
    constructor(t) {
        this.$a = t, 
        // The version of each document that was read during this transaction.
        this.La = Xt(), this.mutations = [], this.ka = !1, 
        /**
         * A deferred usage error that occurred previously in this transaction that
         * will cause the transaction to fail once it actually commits.
         */
        this.Oa = null, 
        /**
         * Set of documents that have been written in the transaction.
         *
         * When there's more than one write to the same key in a transaction, any
         * writes after the first are handled differently.
         */
        this.qa = new Set;
    }
    async Ma(t) {
        if (this.xa(), this.mutations.length > 0) throw new m(E.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
        const e = await async function(t, e) {
            const s = be(t), i = {
                database: s.serializer.mi,
                documents: e.map(t => s.serializer.di(t))
            }, n = await s.Na("BatchGetDocuments", i), r = new Map;
            n.forEach(t => {
                const e = s.serializer.pi(t);
                r.set(e.key.toString(), e);
            });
            const h = [];
            return e.forEach(t => {
                const e = r.get(t.toString());
                ge(!!e), h.push(e);
            }), h;
        }(this.$a, t);
        return e.forEach(t => {
            t instanceof Pt || t instanceof At ? this.Ba(t) : ye();
        }), e;
    }
    set(t, e) {
        this.write(e.Mo(t, this.Rt(t))), this.qa.add(t);
    }
    update(t, e) {
        try {
            this.write(e.Mo(t, this.Ua(t)));
        } catch (t) {
            this.Oa = t;
        }
        this.qa.add(t);
    }
    delete(t) {
        this.write([ new Tt(t, this.Rt(t)) ]), this.qa.add(t);
    }
    async commit() {
        if (this.xa(), this.Oa) throw this.Oa;
        let t = this.La;
        // For each mutation, note that the doc was written.
                this.mutations.forEach(e => {
            t = t.remove(e.key);
        }), 
        // For each document that was read but not written to, we want to perform
        // a `verify` operation.
        t.forEach((t, e) => {
            this.mutations.push(new wt(t, this.Rt(t)));
        }), await async function(t, e) {
            const s = be(t), i = {
                database: s.serializer.mi,
                writes: e.map(t => s.serializer.vi(t))
            }, n = await s.Fa("Commit", i);
            return s.serializer.Oi(n.writeResults, n.commitTime);
        }(this.$a, this.mutations), this.ka = !0;
    }
    Ba(t) {
        let e;
        if (t instanceof At) e = t.version; else {
            if (!(t instanceof Pt)) throw ye();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
            e = y.min();
        }
        const s = this.La.get(t.key);
        if (null !== s) {
            if (!e.isEqual(s)) 
            // This transaction will fail no matter what.
            throw new m(E.ABORTED, "Document version changed between two reads.");
        } else this.La = this.La.Re(t.key, e);
    }
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */    Rt(t) {
        const e = this.La.get(t);
        return !this.qa.has(t) && e ? ct.updateTime(e) : ct.dt();
    }
    /**
     * Returns the precondition for a document if the operation is an update.
     */    Ua(t) {
        const e = this.La.get(t);
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.qa.has(t) && e) {
            if (e.isEqual(y.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new m(E.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return ct.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
        return ct.exists(!0);
    }
    write(t) {
        this.xa(), this.mutations = this.mutations.concat(t);
    }
    xa() {}
}

/**
 * @license
 * Copyright 2018 Google LLC
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
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
class Hs {
    constructor(t, e) {
        this.Tr = t, this.Qa = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.Wa = 0, 
        /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.ja = null, 
        /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.Ga = !0;
    }
    /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */    Ha() {
        0 === this.Wa && (this.Ka("Unknown" /* Unknown */), this.ja = this.Tr.dr("online_state_timeout" /* OnlineStateTimeout */ , 1e4, () => (this.ja = null, 
        this.za("Backend didn't respond within 10 seconds."), this.Ka("Offline" /* Offline */), 
        Promise.resolve())));
    }
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */    Ya(t) {
        "Online" /* Online */ === this.state ? this.Ka("Unknown" /* Unknown */) : (this.Wa++, 
        this.Wa >= 1 && (this.Xa(), this.za("Connection failed 1 " + `times. Most recent error: ${t.toString()}`), 
        this.Ka("Offline" /* Offline */)));
    }
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */    set(t) {
        this.Xa(), this.Wa = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.Ga = !1), this.Ka(t);
    }
    Ka(t) {
        t !== this.state && (this.state = t, this.Qa(t));
    }
    za(t) {
        const e = `Could not reach Cloud Firestore backend. ${t}\n` + "This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.";
        this.Ga ? (Ve(e), this.Ga = !1) : Pe("OnlineStateTracker", e);
    }
    Xa() {
        null !== this.ja && (this.ja.cancel(), this.ja = null);
    }
}

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
/**
 * RemoteStore - An interface to remotely stored data, basically providing a
 * wrapper around the Datastore that is more reliable for the rest of the
 * system.
 *
 * RemoteStore is responsible for maintaining the connection to the server.
 * - maintaining a list of active listens.
 * - reconnecting when the connection is dropped.
 * - resuming all the active listens on reconnect.
 *
 * RemoteStore handles all incoming events from the Datastore.
 * - listening to the watch stream and repackaging the events as RemoteEvents
 * - notifying SyncEngine of any changes to the active listens.
 *
 * RemoteStore takes writes from other components and handles them reliably.
 * - pulling pending mutations from LocalStore and sending them to Datastore.
 * - retrying mutations that failed because of network problems.
 * - acking mutations to the SyncEngine once they are accepted or rejected.
 */
class Ks {
    constructor(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    e, s, i, n) {
        this.Ja = t, this.$a = e, this.Tr = s, 
        /**
         * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
         * LocalStore via fillWritePipeline() and have or will send to the write
         * stream.
         *
         * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
         * restart the write stream. When the stream is established the writes in the
         * pipeline will be sent in order.
         *
         * Writes remain in writePipeline until they are acknowledged by the backend
         * and thus will automatically be re-sent if the stream is interrupted /
         * restarted before they're acknowledged.
         *
         * Write responses from the backend are linked to their originating request
         * purely based on order, and so we can just shift() writes from the front of
         * the writePipeline as we receive responses.
         */
        this.Za = [], 
        /**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */
        this.tu = new Map, this.eu = null, 
        /**
         * Set to true by enableNetwork() and false by disableNetwork() and indicates
         * the user-preferred network state.
         */
        this.networkEnabled = !1, this.isPrimary = !1, 
        /**
         * When set to `true`, the network was taken offline due to an IndexedDB
         * failure. The state is flipped to `false` when access becomes available
         * again.
         */
        this.su = !1, this.iu = n, this.iu.nu(t => {
            s.Vr(async () => {
                this.ru() && (Pe("RemoteStore", "Restarting streams for network reachability change."), 
                await this.hu());
            });
        }), this.ou = new Hs(s, i), 
        // Create streams (but note they're not started yet).
        this.au = function(t, e, s) {
            const i = be(t);
            return new Qs(e, i.sa, i.credentials, i.serializer, s);
        }(this.$a, s, {
            Ra: this.uu.bind(this),
            Ta: this.cu.bind(this),
            Pa: this.lu.bind(this)
        }), this._u = function(t, e, s) {
            const i = be(t);
            return new Ws(e, i.sa, i.credentials, i.serializer, s);
        }(this.$a, s, {
            Ra: this.fu.bind(this),
            Ta: this.du.bind(this),
            Sa: this.Tu.bind(this),
            va: this.va.bind(this)
        });
    }
    /**
     * Starts up the remote store, creating streams, restoring state from
     * LocalStore, etc.
     */    start() {
        return this.enableNetwork();
    }
    /** Re-enables the network. Idempotent. */    enableNetwork() {
        return this.networkEnabled = !0, this.wu();
    }
    async wu() {
        this.ru() && (this._u.lastStreamToken = await this.Ja.Oh(), this.Eu() ? this.mu() : this.ou.set("Unknown" /* Unknown */), 
        // This will start the write stream if necessary.
        await this.Iu());
    }
    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */    async disableNetwork() {
        this.networkEnabled = !1, await this.Ru(), 
        // Set the OnlineState to Offline so get()s return from cache, etc.
        this.ou.set("Offline" /* Offline */);
    }
    async Ru() {
        await this._u.stop(), await this.au.stop(), this.Za.length > 0 && (Pe("RemoteStore", `Stopping write stream with ${this.Za.length} pending writes`), 
        this.Za = []), this.Au();
    }
    async Pu() {
        Pe("RemoteStore", "RemoteStore shutting down."), this.networkEnabled = !1, await this.Ru(), 
        this.iu.Pu(), 
        // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
        // triggering spurious listener events with cached data, etc.
        this.ou.set("Unknown" /* Unknown */);
    }
    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */    listen(t) {
        this.tu.has(t.targetId) || (
        // Mark this as something the client is currently listening for.
        this.tu.set(t.targetId, t), this.Eu() ? 
        // The listen will be sent in onWatchStreamOpen
        this.mu() : this.au.oa() && this.Vu(t));
    }
    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */    pu(t) {
        this.tu.delete(t), this.au.oa() && this.yu(t), 0 === this.tu.size && (this.au.oa() ? this.au.ca() : this.ru() && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        this.ou.set("Unknown" /* Unknown */));
    }
    /** {@link TargetMetadataProvider.getTargetDataForTarget} */    si(t) {
        return this.tu.get(t) || null;
    }
    /** {@link TargetMetadataProvider.getRemoteKeysForTarget} */    ei(t) {
        return this.gu.ei(t);
    }
    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */    Vu(t) {
        this.eu.Ns(t.targetId), this.au.Va(t);
    }
    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */    yu(t) {
        this.eu.Ns(t), this.au.pa(t);
    }
    mu() {
        this.eu = new le(this), this.au.start(), this.ou.Ha();
    }
    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */    Eu() {
        return this.ru() && !this.au.ha() && this.tu.size > 0;
    }
    ru() {
        return !this.su && this.isPrimary && this.networkEnabled;
    }
    Au() {
        this.eu = null;
    }
    async uu() {
        this.tu.forEach((t, e) => {
            this.Vu(t);
        });
    }
    async cu(t) {
        this.Au(), 
        // If we still need the watch stream, retry the connection.
        this.Eu() ? (this.ou.Ya(t), this.mu()) : 
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        this.ou.set("Unknown" /* Unknown */);
    }
    async lu(t, e) {
        if (
        // Mark the client as online since we got a message from the server
        this.ou.set("Online" /* Online */), t instanceof ue && 2 /* Removed */ === t.state && t.cause) 
        // There was an error on a target, don't wait for a consistent snapshot
        // to raise events
        try {
            await this.bu(t);
        } catch (e) {
            Pe("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), e), 
            await this.vu(e);
        } else if (t instanceof oe ? this.eu.Bs(t) : t instanceof ae ? this.eu.zs(t) : this.eu.Ws(t), 
        !e.isEqual(y.min())) try {
            const t = await this.Ja.Mh();
            e.S(t) >= 0 && 
            // We have received a target change with a global snapshot if the snapshot
            // version is not equal to SnapshotVersion.min().
            await this.Su(e);
        } catch (t) {
            Pe("RemoteStore", "Failed to raise snapshot:", t), await this.vu(t);
        }
    }
    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * IndexedDb probing succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`.
     */    async vu(t) {
        if ("IndexedDbTransactionError" !== t.name) throw t;
        this.su = !0, 
        // Disable network and raise offline snapshots
        await this.Ru(), this.ou.set("Offline" /* Offline */), 
        // Probe IndexedDB periodically and re-enable network
        this.Tr.xr(async () => {
            Pe("RemoteStore", "Retrying IndexedDB access"), 
            // Issue a simple read operation to determine if IndexedDB recovered.
            // Ideally, we would expose a health check directly on SimpleDb, but
            // RemoteStore only has access to persistence through LocalStore.
            await this.Ja.Mh(), this.su = !1, await this.wu();
        });
    }
    /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */    Su(t) {
        const e = this.eu.Js(t);
        // Update in-memory resume tokens. LocalStore will update the
        // persistent view of these when applying the completed RemoteEvent.
                // Finally raise remote event
        return e.as.forEach((e, s) => {
            if (e.resumeToken.rt() > 0) {
                const i = this.tu.get(s);
                // A watched target might have been removed already.
                                i && this.tu.set(s, i.me(e.resumeToken, t));
            }
        }), 
        // Re-establish listens for the targets that have been invalidated by
        // existence filter mismatches.
        e.us.forEach(t => {
            const e = this.tu.get(t);
            if (!e) 
            // A watched target might have been removed already.
            return;
            // Clear the resume token for the target, since we're in a known mismatch
            // state.
                        this.tu.set(t, e.me($.ht, e.we)), 
            // Cause a hard reset by unwatching and rewatching immediately, but
            // deliberately don't send a resume token so that we get a full update.
            this.yu(t);
            // Mark the target we send as being on behalf of an existence filter
            // mismatch, but don't actually retain that in listenTargets. This ensures
            // that we flag the first re-listen this way without impacting future
            // listens of this target (that might happen e.g. on reconnect).
            const s = new $t(e.target, t, 1 /* ExistenceFilterMismatch */ , e.sequenceNumber);
            this.Vu(s);
        }), this.gu.xh(e);
    }
    /** Handles an error on a target */    async bu(t) {
        const e = t.cause;
        for (const s of t.targetIds) 
        // A watched target might have been removed already.
        this.tu.has(s) && (await this.gu.Cu(s, e), this.tu.delete(s), this.eu.removeTarget(s));
    }
    /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */    async Iu() {
        if (this.Du()) {
            const t = this.Za.length > 0 ? this.Za[this.Za.length - 1].batchId : -1, e = await this.Ja.eo(t);
            null === e ? 0 === this.Za.length && this._u.ca() : (this.Fu(e), await this.Iu());
        }
        this.Nu() && this.$u();
    }
    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */    Du() {
        return this.ru() && this.Za.length < 10;
    }
    // For testing
    Lu() {
        return this.Za.length;
    }
    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */    Fu(t) {
        this.Za.push(t), this._u.oa() && this._u.ga && this._u.ba(t.mutations);
    }
    Nu() {
        return this.ru() && !this._u.ha() && this.Za.length > 0;
    }
    $u() {
        this._u.start();
    }
    async fu() {
        this._u.Ca();
    }
    Tu() {
        // Record the stream token.
        return this.Ja.qh(this._u.lastStreamToken).then(() => {
            // Send the write pipeline now that the stream is established.
            for (const t of this.Za) this._u.ba(t.mutations);
        }).catch(ze);
    }
    va(t, e) {
        const s = this.Za.shift(), i = Le.from(s, t, e, this._u.lastStreamToken);
        return this.gu.ku(i).then(() => this.Iu());
    }
    async du(t) {
        // If the write stream closed due to an error, invoke the error callbacks if
        // there are pending writes.
        t && this.Za.length > 0 && (this._u.ga ? 
        // This error affects the actual write.
        await this.Ou(t) : 
        // If there was an error before the handshake has finished, it's
        // possible that the server is unable to process the stream token
        // we're sending. (Perhaps it's too old?)
        await this.qu(t), 
        // The write stream might have been started by refilling the write
        // pipeline for failed writes
        this.Nu() && this.$u());
        // No pending writes, nothing to do
        }
    async qu(t) {
        // Reset the token if it's a permanent error, signaling the write stream is
        // no longer valid. Note that the handshake does not count as a write: see
        // comments on isPermanentWriteError for details.
        if (qt(t.code)) return Pe("RemoteStore", "RemoteStore error before completed handshake; resetting stream token: ", this._u.lastStreamToken), 
        this._u.lastStreamToken = $.ht, this.Ja.qh($.ht).catch(ze);
    }
    async Ou(t) {
        // Only handle permanent errors here. If it's transient, just let the retry
        // logic kick in.
        if (qt(e = t.code) && e !== E.ABORTED) {
            // This was a permanent error, the request itself was the problem
            // so it's not going to succeed if we resend it.
            const e = this.Za.shift();
            // In this case it's also unlikely that the server itself is melting
            // down -- this was just a bad request so inhibit backoff on the next
            // restart.
                        return this._u.ua(), this.gu.Mu(e.batchId, t).then(() => this.Iu());
        }
        var e;
        /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */    }
    xu() {
        return new Gs(this.$a);
    }
    async hu() {
        this.networkEnabled = !1, await this.Ru(), this.ou.set("Unknown" /* Unknown */), 
        await this.enableNetwork();
    }
    async Bu() {
        this.ru() && (
        // Tear down and re-create our network streams. This will ensure we get a fresh auth token
        // for the new user and re-fill the write pipeline with new mutations from the LocalStore
        // (since mutations are per-user).
        Pe("RemoteStore", "RemoteStore restarting streams for new credential"), await this.hu());
    }
    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */    async Uu(t) {
        this.isPrimary = t, t && this.networkEnabled ? await this.enableNetwork() : t || (await this.Ru(), 
        this.ou.set("Unknown" /* Unknown */));
    }
}

/**
 * @license
 * Copyright 2018 Google LLC
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
/**
 * Metadata state of the local client. Unlike `RemoteClientState`, this class is
 * mutable and keeps track of all pending mutations, which allows us to
 * update the range of pending mutation batch IDs as new mutations are added or
 * removed.
 *
 * The data in `LocalClientState` is not read from WebStorage and instead
 * updated via its instance methods. The updated state can be serialized via
 * `toWebStorageJSON()`.
 */
// Visible for testing.
class zs {
    constructor() {
        this.activeTargetIds = ee();
    }
    Qu(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }
    Wu(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */    ju() {
        const t = {
            activeTargetIds: this.activeTargetIds.W(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }
}

/**
 * `MemorySharedClientState` is a simple implementation of SharedClientState for
 * clients using memory persistence. The state in this class remains fully
 * isolated and no synchronization is performed.
 */ class Ys {
    constructor() {
        this.Gu = new zs, this.Hu = {}, this.gu = null, this.Qa = null, this.Xn = null;
    }
    Ku(t) {
        // No op.
    }
    zu(t, e, s) {
        // No op.
    }
    Yu(t) {
        return this.Gu.Qu(t), this.Hu[t] || "not-current";
    }
    Xu(t, e, s) {
        this.Hu[t] = e;
    }
    Ju(t) {
        this.Gu.Wu(t);
    }
    Zu(t) {
        return this.Gu.activeTargetIds.has(t);
    }
    tc(t) {
        delete this.Hu[t];
    }
    ec() {
        return this.Gu.activeTargetIds;
    }
    sc(t) {
        return this.Gu.activeTargetIds.has(t);
    }
    start() {
        return this.Gu = new zs, Promise.resolve();
    }
    Rh(t, e, s) {
        // No op.
    }
    ic(t) {
        // No op.
    }
    Pu() {}
    tr(t) {}
}

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
 */ class Xs {
    constructor(t) {
        this.key = t;
    }
}

class Js {
    constructor(t) {
        this.key = t;
    }
}

/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */ class Zs {
    constructor(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.nc = e, this.rc = null, 
        /**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */
        this.ds = !1, 
        /** Documents in the view but not in the remote target */
        this.hc = Zt(), 
        /** Document Keys that have local changes */
        this.ns = Zt(), this.oc = new se(t.se.bind(t));
    }
    /**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */    get ac() {
        return this.nc;
    }
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges The doc changes to apply to this view.
     * @param previousChanges If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @return a new set of docs, changes, and refill flag.
     */    uc(t, e) {
        const s = e ? e.cc : new ie, i = e ? e.oc : this.oc;
        let n = e ? e.ns : this.ns, r = i, h = !1;
        // Track the last doc in a (full) limit. This is necessary, because some
        // update (a delete, or an update moving a doc past the old limit) might
        // mean there is some other document in the local cache that either should
        // come (1) between the old last limit doc and the new last document, in the
        // case of updates, or (2) after the new last document, in the case of
        // deletes. So we keep this doc at the old limit to compare the updates to.
        // Note that this should never get used in a refill (when previousChanges is
        // set), because there will only be adds -- no deletes or updates.
        const o = this.query.oe() && i.size === this.query.limit ? i.last() : null, a = this.query.ae() && i.size === this.query.limit ? i.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.ye((t, e) => {
            const u = i.get(t);
            let c = e instanceof At ? e : null;
            c && (c = this.query.matches(c) ? c : null);
            const l = !!u && this.ns.has(u.key), _ = !!c && (c.At || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            this.ns.has(c.key) && c.hasCommittedMutations);
            let f = !1;
            // Calculate change
                        if (u && c) {
                u.data().isEqual(c.data()) ? l !== _ && (s.track({
                    type: 3 /* Metadata */ ,
                    doc: c
                }), f = !0) : this.lc(u, c) || (s.track({
                    type: 2 /* Modified */ ,
                    doc: c
                }), f = !0, (o && this.query.se(c, o) > 0 || a && this.query.se(c, a) < 0) && (
                // This doc moved from inside the limit to outside the limit.
                // That means there may be some other doc in the local cache
                // that should be included instead.
                h = !0));
            } else !u && c ? (s.track({
                type: 0 /* Added */ ,
                doc: c
            }), f = !0) : u && !c && (s.track({
                type: 1 /* Removed */ ,
                doc: u
            }), f = !0, (o || a) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            h = !0));
            f && (c ? (r = r.add(c), n = _ ? n.add(t) : n.delete(t)) : (r = r.delete(t), n = n.delete(t)));
        }), this.query.oe() || this.query.ae()) for (;r.size > this.query.limit; ) {
            const t = this.query.oe() ? r.last() : r.first();
            r = r.delete(t.key), n = n.delete(t.key), s.track({
                type: 1 /* Removed */ ,
                doc: t
            });
        }
        return {
            oc: r,
            cc: s,
            _c: h,
            ns: n
        };
    }
    lc(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.At && e.hasCommittedMutations && !e.At;
    }
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges The set of changes to make to the view's docs.
     * @param updateLimboDocuments Whether to update limbo documents based on this
     *        change.
     * @param targetChange A target change to apply for computing limbo docs and
     *        sync state.
     * @return A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    fc(t, e, s) {
        const i = this.oc;
        this.oc = t.oc, this.ns = t.ns;
        // Sort changes based on type and query comparator
        const n = t.cc.es();
        n.sort((t, e) => function(t, e) {
            const s = t => {
                switch (t) {
                  case 0 /* Added */ :
                    return 1;

                  case 2 /* Modified */ :
                  case 3 /* Metadata */ :
                    // A metadata change is converted to a modified change at the public
                    // api layer.  Since we sort by document key and then change type,
                    // metadata and modified changes must be sorted equivalently.
                    return 2;

                  case 1 /* Removed */ :
                    return 0;

                  default:
                    return ye();
                }
            };
            return s(t) - s(e);
        }
        /**
 * @license
 * Copyright 2019 Google LLC
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
 */ (t.type, e.type) || this.query.se(t.doc, e.doc)), this.dc(s);
        const r = e ? this.Tc() : [], h = 0 === this.hc.size && this.ds ? 1 /* Synced */ : 0 /* Local */ , o = h !== this.rc;
        if (this.rc = h, 0 !== n.length || o) {
            return {
                snapshot: new ne(this.query, t.oc, i, n, t.ns, 0 /* Local */ === h, o, 
                /* excludesMetadataChanges= */ !1),
                wc: r
            };
        }
        // no changes
        return {
            wc: r
        };
    }
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */    Ec(t) {
        return this.ds && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.ds = !1, this.fc({
            oc: this.oc,
            cc: new ie,
            ns: this.ns,
            _c: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            wc: []
        };
    }
    /**
     * Returns whether the doc for the given key should be in limbo.
     */    mc(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.nc.has(t) && (
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.oc.has(t) && !this.oc.get(t).At);
    }
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */    dc(t) {
        t && (t.Ts.forEach(t => this.nc = this.nc.add(t)), t.ws.forEach(t => {}), t.Es.forEach(t => this.nc = this.nc.delete(t)), 
        this.ds = t.ds);
    }
    Tc() {
        // We can only determine limbo documents when we're in-sync with the server.
        if (!this.ds) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                const t = this.hc;
        this.hc = Zt(), this.oc.forEach(t => {
            this.mc(t.key) && (this.hc = this.hc.add(t.key));
        });
        // Diff the new limbo docs with the old limbo docs.
        const e = [];
        return t.forEach(t => {
            this.hc.has(t) || e.push(new Js(t));
        }), this.hc.forEach(s => {
            t.has(s) || e.push(new Xs(s));
        }), e;
    }
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @return The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    Ic(t) {
        this.nc = t.lo, this.hc = Zt();
        const e = this.uc(t.documents);
        return this.fc(e, /*updateLimboDocuments=*/ !0);
    }
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    Rc() {
        return ne.os(this.query, this.oc, this.ns, 0 /* Local */ === this.rc);
    }
}

/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
class ti {
    constructor(t, e, s, i) {
        this.Tr = t, this.Ac = e, this.updateFunction = s, this.mr = i, this.Pc = 5, this.Dr = new Be(this.Tr, "transaction_retry" /* TransactionRetry */);
    }
    /** Runs the transaction and sets the result on deferred. */    Vc() {
        this.pc();
    }
    pc() {
        this.Dr.lr(async () => {
            const t = this.Ac.xu(), e = this.yc(t);
            e && e.then(e => {
                this.Tr.Vr(() => t.commit().then(() => {
                    this.mr.resolve(e);
                }).catch(t => {
                    this.gc(t);
                }));
            }).catch(t => {
                this.gc(t);
            });
        });
    }
    yc(t) {
        try {
            const e = this.updateFunction(t);
            return !L(e) && e.catch && e.then ? e : (this.mr.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.mr.reject(t), null;
        }
    }
    gc(t) {
        this.Pc > 0 && this.bc(t) ? (this.Pc -= 1, this.Tr.Vr(() => (this.pc(), Promise.resolve()))) : this.mr.reject(t);
    }
    bc(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            const e = t.code;
            return "aborted" === e || "failed-precondition" === e || !qt(e);
        }
        return !1;
    }
}

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
/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */
class ei {
    constructor(
    /**
     * The query itself.
     */
    t, 
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    e, 
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    s) {
        this.query = t, this.targetId = e, this.view = s;
    }
}

/** Tracks a limbo resolution. */ class si {
    constructor(t) {
        this.key = t, 
        /**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */
        this.vc = !1;
    }
}

/**
 * SyncEngine is the central controller in the client SDK architecture. It is
 * the glue code between the EventManager, LocalStore, and RemoteStore. Some of
 * SyncEngine's responsibilities include:
 * 1. Coordinating client requests and remote events between the EventManager
 *    and the local and remote data stores.
 * 2. Managing a View object for each query, providing the unified view between
 *    the local and remote data stores.
 * 3. Notifying the RemoteStore when the LocalStore has new mutations in its
 *    queue that need sending to the backend.
 *
 * The SyncEngine’s methods should only ever be called by methods running in the
 * global async queue.
 */ class ii {
    constructor(t, e, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    s, i, n) {
        this.Ja = t, this.Ac = e, this.Sc = s, this.currentUser = i, this.Cc = n, this.Dc = null, 
        this.Fc = new Ne(t => t.canonicalId()), this.Nc = new Map, 
        /**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query.
         */
        this.$c = [], 
        /**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */
        this.Lc = new xt(C.N), 
        /**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */
        this.kc = new Map, this.Oc = new Ye, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.qc = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.Mc = new Map, this.xc = je.nh(), this.onlineState = "Unknown" /* Unknown */;
    }
    get Bc() {
        return !0;
    }
    /** Subscribes to SyncEngine notifications. Has to be called exactly once. */    subscribe(t) {
        this.Dc = t;
    }
    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */    async listen(t) {
        let e, s;
        this.Uc("listen()");
        const i = this.Fc.get(t);
        if (i) 
        // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
        // already exists when EventManager calls us for the first time. This
        // happens when the primary tab is already listening to this query on
        // behalf of another tab and the user of the primary also starts listening
        // to the query. EventManager will not have an assigned target ID in this
        // case and calls `listen` to obtain this ID.
        e = i.targetId, this.Sc.Yu(e), s = i.view.Rc(); else {
            const i = await this.Ja.no(t.ee()), n = this.Sc.Yu(i.targetId);
            e = i.targetId, s = await this.Qc(t, e, "current" === n), this.Bc && this.Ac.listen(i);
        }
        return s;
    }
    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */    async Qc(t, e, s) {
        const i = await this.Ja.uo(t, 
        /* usePreviousResults= */ !0), n = new Zs(t, i.lo), r = n.uc(i.documents), h = he.fs(e, s && "Offline" /* Offline */ !== this.onlineState), o = n.fc(r, 
        /* updateLimboDocuments= */ this.Bc, h);
        this.Wc(e, o.wc);
        const a = new ei(t, e, n);
        return this.Fc.set(t, a), this.Nc.has(e) ? this.Nc.get(e).push(t) : this.Nc.set(e, [ t ]), 
        o.snapshot;
    }
    /** Stops listening to the query. */    async pu(t) {
        this.Uc("unlisten()");
        const e = this.Fc.get(t), s = this.Nc.get(e.targetId);
        // Only clean up the query view and target if this is the only query mapped
        // to the target.
                if (s.length > 1) return this.Nc.set(e.targetId, s.filter(e => !e.isEqual(t))), 
        void this.Fc.delete(t);
        // No other queries are mapped to the target, clean up the query and the target.
                if (this.Bc) {
            // We need to remove the local query target first to allow us to verify
            // whether any other client is still interested in this target.
            this.Sc.Ju(e.targetId), this.Sc.sc(e.targetId) || await this.Ja.ao(e.targetId, /*keepPersistedTargetData=*/ !1).then(() => {
                this.Sc.tc(e.targetId), this.Ac.pu(e.targetId), this.jc(e.targetId);
            }).catch(ze);
        } else this.jc(e.targetId), await this.Ja.ao(e.targetId, 
        /*keepPersistedTargetData=*/ !0);
    }
    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */    async write(t, e) {
        let s;
        this.Uc("write()");
        try {
            s = await this.Ja.yh(t);
        } catch (t) {
            if ("IndexedDbTransactionError" === t.name) 
            // If we can't persist the mutation, we reject the user callback and
            // don't send the mutation. The user can then retry the write.
            return Ve("SyncEngine", "Dropping write that cannot be persisted: " + t), void e.reject(new m(E.UNAVAILABLE, "Failed to persist write: " + t));
            throw t;
        }
        this.Sc.Ku(s.batchId), this.Gc(s.batchId, e), await this.Hc(s.bh), await this.Ac.Iu();
    }
    /**
     * Takes an updateFunction in which a set of reads and writes can be performed
     * atomically. In the updateFunction, the client can read and write values
     * using the supplied transaction object. After the updateFunction, all
     * changes will be committed. If a retryable error occurs (ex: some other
     * client has changed any of the data referenced), then the updateFunction
     * will be called again after a backoff. If the updateFunction still fails
     * after all retries, then the transaction will be rejected.
     *
     * The transaction object passed to the updateFunction contains methods for
     * accessing documents and collections. Unlike other datastore access, data
     * accessed with the transaction will not reflect local changes that have not
     * been committed. For this reason, it is required that all reads are
     * performed before any writes. Transactions must be performed while online.
     *
     * The Deferred input is resolved when the transaction is fully committed.
     */    runTransaction(t, e, s) {
        new ti(t, this.Ac, e, s).Vc();
    }
    async xh(t) {
        this.Uc("applyRemoteEvent()");
        try {
            const e = await this.Ja.xh(t);
            // Update `receivedDocument` as appropriate for any limbo targets.
                        t.as.forEach((t, e) => {
                const s = this.kc.get(e);
                s && (
                // Since this is a limbo resolution lookup, it's for a single document
                // and it could be added, modified, or removed, but not a combination.
                ge(t.Ts.size + t.ws.size + t.Es.size <= 1), t.Ts.size > 0 ? s.vc = !0 : t.ws.size > 0 ? ge(s.vc) : t.Es.size > 0 && (ge(s.vc), 
                s.vc = !1));
            }), await this.Hc(e, t);
        } catch (t) {
            await ze(t);
        }
    }
    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */    Ec(t, e) {
        this.Uc("applyOnlineStateChange()");
        const s = [];
        this.Fc.forEach((e, i) => {
            const n = i.view.Ec(t);
            n.snapshot && s.push(n.snapshot);
        }), this.Dc.Kc(t), this.Dc.Pa(s), this.onlineState = t;
    }
    async Cu(t, e) {
        this.Uc("rejectListens()"), 
        // PORTING NOTE: Multi-tab only.
        this.Sc.Xu(t, "rejected", e);
        const s = this.kc.get(t), i = s && s.key;
        if (i) {
            // Since this query failed, we won't want to manually unlisten to it.
            // So go ahead and remove it from bookkeeping.
            this.Lc = this.Lc.remove(i), this.kc.delete(t), this.zc();
            // TODO(klimt): We really only should do the following on permission
            // denied errors, but we don't have the cause code here.
            // It's a limbo doc. Create a synthetic event saying it was deleted.
            // This is kind of a hack. Ideally, we would have a method in the local
            // store to purge a document. However, it would be tricky to keep all of
            // the local store's invariants with another method.
            let e = new xt(C.N);
            e = e.Re(i, new Pt(i, y.min()));
            const s = Zt().add(i), n = new re(y.min(), 
            /* targetChanges= */ new Map, 
            /* targetMismatches= */ new Qt(Se), e, s);
            return this.xh(n);
        }
        await this.Ja.ao(t, /* keepPersistedTargetData */ !1).then(() => this.jc(t, e)).catch(ze);
    }
    async ku(t) {
        this.Uc("applySuccessfulWrite()");
        const e = t.batch.batchId;
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught
        // up), so we raise user callbacks first so that they consistently happen
        // before listen events.
                this.Yc(e, /*error=*/ null), this.Xc(e);
        try {
            const s = await this.Ja.vh(t);
            this.Sc.zu(e, "acknowledged"), await this.Hc(s);
        } catch (t) {
            await ze(t);
        }
    }
    async Mu(t, e) {
        this.Uc("rejectFailedWrite()"), 
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught up),
        // so we raise user callbacks first so that they consistently happen before
        // listen events.
        this.Yc(t, e), this.Xc(t);
        try {
            const s = await this.Ja.Nh(t);
            this.Sc.zu(t, "rejected", e), await this.Hc(s);
        } catch (e) {
            await ze(e);
        }
    }
    /**
     * Registers a user callback that resolves when all pending mutations at the moment of calling
     * are acknowledged .
     */    async Jc(t) {
        this.Ac.ru() || Pe("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
        const e = await this.Ja.kh();
        if (-1 === e) 
        // Trigger the callback right away if there is no pending writes at the moment.
        return void t.resolve();
        const s = this.Mc.get(e) || [];
        s.push(t), this.Mc.set(e, s);
    }
    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */    Xc(t) {
        (this.Mc.get(t) || []).forEach(t => {
            t.resolve();
        }), this.Mc.delete(t);
    }
    /** Reject all outstanding callbacks waiting for pending writes to complete. */    Zc(t) {
        this.Mc.forEach(e => {
            e.forEach(e => {
                e.reject(new m(E.CANCELLED, t));
            });
        }), this.Mc.clear();
    }
    Gc(t, e) {
        let s = this.qc[this.currentUser.s()];
        s || (s = new xt(Se)), s = s.Re(t, e), this.qc[this.currentUser.s()] = s;
    }
    /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */    Yc(t, e) {
        let s = this.qc[this.currentUser.s()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
                if (s) {
            const i = s.get(t);
            i && (e ? i.reject(e) : i.resolve(), s = s.remove(t)), this.qc[this.currentUser.s()] = s;
        }
    }
    jc(t, e = null) {
        this.Sc.Ju(t);
        for (const s of this.Nc.get(t)) this.Fc.delete(s), e && this.Dc.tl(s, e);
        if (this.Nc.delete(t), this.Bc) {
            this.Oc.Ao(t).forEach(t => {
                this.Oc.po(t) || 
                // We removed the last reference for this key
                this.el(t);
            });
        }
    }
    el(t) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        const e = this.Lc.get(t);
        null !== e && (this.Ac.pu(e), this.Lc = this.Lc.remove(t), this.kc.delete(e), this.zc());
    }
    Wc(t, e) {
        for (const s of e) if (s instanceof Xs) this.Oc.Zh(s.key, t), this.sl(s); else if (s instanceof Js) {
            Pe("SyncEngine", "Document no longer in limbo: " + s.key), this.Oc.to(s.key, t), 
            this.Oc.po(s.key) || 
            // We removed the last reference for this key
            this.el(s.key);
        } else ye();
    }
    sl(t) {
        const e = t.key;
        this.Lc.get(e) || (Pe("SyncEngine", "New document in limbo: " + e), this.$c.push(e), 
        this.zc());
    }
    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */    zc() {
        for (;this.$c.length > 0 && this.Lc.size < this.Cc; ) {
            const t = this.$c.shift(), e = this.xc.next();
            this.kc.set(e, new si(t)), this.Lc = this.Lc.Re(t, e), this.Ac.listen(new $t(yt.Wt(t.path).ee(), e, 2 /* LimboResolution */ , Me.er));
        }
    }
    // Visible for testing
    il() {
        return this.Lc;
    }
    // Visible for testing
    nl() {
        return this.$c;
    }
    async Hc(t, e) {
        const s = [], i = [], n = [];
        this.Fc.forEach((r, h) => {
            n.push(Promise.resolve().then(() => {
                const e = h.view.uc(t);
                return e._c ? this.Ja.uo(h.query, /* usePreviousResults= */ !1).then(({documents: t}) => h.view.uc(t, e)) : e;
                // The query has a limit and some docs were removed, so we need
                // to re-run the query against the local store to make sure we
                // didn't lose any good docs that had been past the limit.
                        }).then(t => {
                const n = e && e.as.get(h.targetId), r = h.view.fc(t, 
                /* updateLimboDocuments= */ this.Bc, n);
                if (this.Wc(h.targetId, r.wc), r.snapshot) {
                    this.Bc && this.Sc.Xu(h.targetId, r.snapshot.fromCache ? "not-current" : "current"), 
                    s.push(r.snapshot);
                    const t = qe.Yn(h.targetId, r.snapshot);
                    i.push(t);
                }
            }));
        }), await Promise.all(n), this.Dc.Pa(s), await this.Ja.Jh(i);
    }
    Uc(t) {}
    async Bu(t) {
        const e = !this.currentUser.isEqual(t);
        if (this.currentUser = t, e) {
            // Fails tasks waiting for pending writes requested by previous user.
            this.Zc("'waitForPendingWrites' promise is rejected due to a user change.");
            const e = await this.Ja.Rh(t);
            // TODO(b/114226417): Consider calling this only in the primary tab.
                        this.Sc.Rh(t, e.Vh, e.ph), await this.Hc(e.Ph);
        }
        await this.Ac.Bu();
    }
    enableNetwork() {
        return this.Ac.enableNetwork();
    }
    disableNetwork() {
        return this.Ac.disableNetwork();
    }
    ei(t) {
        const e = this.kc.get(t);
        if (e && e.vc) return Zt().add(e.key);
        {
            let e = Zt();
            const s = this.Nc.get(t);
            if (!s) return e;
            for (const t of s) {
                const s = this.Fc.get(t);
                e = e.ze(s.view.ac);
            }
            return e;
        }
    }
}

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
/**
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */
class ni {
    constructor() {
        this.rl = void 0, this.hl = [];
    }
}

/**
 * EventManager is responsible for mapping queries to query event emitters.
 * It handles "fan-out". -- Identical queries will re-use the same watch on the
 * backend.
 */ class ri {
    constructor(t) {
        this.gu = t, this.ol = new Ne(t => t.canonicalId()), this.onlineState = "Unknown" /* Unknown */ , 
        this.al = new Set, this.gu.subscribe(this);
    }
    async listen(t) {
        const e = t.query;
        let s = !1, i = this.ol.get(e);
        if (i || (s = !0, i = new ni), s) try {
            i.rl = await this.gu.listen(e);
        } catch (s) {
            const i = `Initialization of query '${e}' failed: ${s}`;
            if (Ve("EventManager", i), "IndexedDbTransactionError" !== s.name) throw s;
            return void t.onError(new m(E.UNAVAILABLE, i));
        }
        this.ol.set(e, i), i.hl.push(t);
        // Run global snapshot listeners if a consistent snapshot has been emitted.
        t.Ec(this.onlineState);
        if (i.rl) {
            t.ul(i.rl) && this.cl();
        }
    }
    async pu(t) {
        const e = t.query;
        let s = !1;
        const i = this.ol.get(e);
        if (i) {
            const e = i.hl.indexOf(t);
            e >= 0 && (i.hl.splice(e, 1), s = 0 === i.hl.length);
        }
        if (s) return this.ol.delete(e), this.gu.pu(e);
    }
    Pa(t) {
        let e = !1;
        for (const s of t) {
            const t = s.query, i = this.ol.get(t);
            if (i) {
                for (const t of i.hl) t.ul(s) && (e = !0);
                i.rl = s;
            }
        }
        e && this.cl();
    }
    tl(t, e) {
        const s = this.ol.get(t);
        if (s) for (const t of s.hl) t.onError(e);
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
                this.ol.delete(t);
    }
    Kc(t) {
        this.onlineState = t;
        let e = !1;
        this.ol.forEach((s, i) => {
            for (const s of i.hl) 
            // Run global snapshot listeners if a consistent snapshot has been emitted.
            s.Ec(t) && (e = !0);
        }), e && this.cl();
    }
    ll(t) {
        this.al.add(t), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        t.next();
    }
    _l(t) {
        this.al.delete(t);
    }
    // Call all global snapshot listeners that have been set.
    cl() {
        this.al.forEach(t => {
            t.next();
        });
    }
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ class hi {
    constructor(t, e, s) {
        this.query = t, this.fl = e, 
        /**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */
        this.dl = !1, this.Tl = null, this.onlineState = "Unknown" /* Unknown */ , this.options = s || {};
    }
    /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */    ul(t) {
        if (!this.options.includeMetadataChanges) {
            // Remove the metadata only changes.
            const e = [];
            for (const s of t.docChanges) 3 /* Metadata */ !== s.type && e.push(s);
            t = new ne(t.query, t.docs, t.ss, e, t.ns, t.fromCache, t.rs, 
            /* excludesMetadataChanges= */ !0);
        }
        let e = !1;
        return this.dl ? this.wl(t) && (this.fl.next(t), e = !0) : this.El(t, this.onlineState) && (this.ml(t), 
        e = !0), this.Tl = t, e;
    }
    onError(t) {
        this.fl.error(t);
    }
    /** Returns whether a snapshot was raised. */    Ec(t) {
        this.onlineState = t;
        let e = !1;
        return this.Tl && !this.dl && this.El(this.Tl, t) && (this.ml(this.Tl), e = !0), 
        e;
    }
    El(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                const s = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return (!this.options.Il || !s) && (!t.docs.M() || "Offline" /* Offline */ === e);
        // Raise data from cache if we have any documents or we are offline
        }
    wl(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        const e = this.Tl && this.Tl.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.rs && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }
    ml(t) {
        t = ne.os(t.query, t.docs, t.ns, t.fromCache), this.dl = !0, this.fl.next(t);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
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
// TOOD(b/140938512): Drop SimpleQueryEngine and rename IndexFreeQueryEngine.
/**
 * A query engine that takes advantage of the target document mapping in the
 * QueryCache. The IndexFreeQueryEngine optimizes query execution by only
 * reading the documents that previously matched a query plus any documents that were
 * edited after the query was last listened to.
 *
 * There are some cases where Index-Free queries are not guaranteed to produce
 * the same results as full collection scans. In these cases, the
 * IndexFreeQueryEngine falls back to full query processing. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of Limbo documents.
 */ class oi {
    Ih(t) {
        this.Rl = t;
    }
    Bn(t, e, i, n) {
        // Queries that match all documents don't benefit from using
        // IndexFreeQueries. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
        return e.te() || i.isEqual(y.min()) ? this.Al(t, e) : this.Rl.qn(t, n).next(r => {
            const h = this.Pl(e, r);
            return (e.oe() || e.ae()) && this._c(e.xt, h, n, i) ? this.Al(t, e) : (Re() <= s.DEBUG && Pe("IndexFreeQueryEngine", "Re-using previous result from %s to execute query: %s", i.toString(), e.toString()), 
            this.Rl.Bn(t, e, i).next(t => (
            // We merge `previousResults` into `updateResults`, since
            // `updateResults` is already a DocumentMap. If a document is
            // contained in both lists, then its contents are the same.
            h.forEach(e => {
                t = t.Re(e.key, e);
            }), t)));
        });
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }
    /** Applies the query filter and sorting to the provided documents.  */    Pl(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        let s = new Qt((e, s) => t.se(e, s));
        return e.forEach((e, i) => {
            i instanceof At && t.matches(i) && (s = s.add(i));
        }), s;
    }
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion The version of the snapshot when the query
     * was last synchronized.
     */    _c(t, e, s, i) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (s.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                const n = "F" /* First */ === t ? e.last() : e.first();
        return !!n && (n.hasPendingWrites || n.version.S(i) > 0);
    }
    Al(t, e) {
        return Re() <= s.DEBUG && Pe("IndexFreeQueryEngine", "Using full collection scan to execute query: %s", e.toString()), 
        this.Rl.Bn(t, e, y.min());
    }
}

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
 */ class ai {
    constructor(t, e) {
        this.Fn = t, this.zh = e, 
        /**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */
        this.Dn = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.Vl = 1, 
        /** The last received stream token from the server, used to acknowledge which
         * responses the client has processed. Stream tokens are opaque checkpoint
         * markers whose only real value is their inclusion in the next request.
         */
        this.lastStreamToken = $.ht, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.pl = new Qt(Xe.To);
    }
    yl(t) {
        return ke.resolve(0 === this.Dn.length);
    }
    vh(t, e, s) {
        const i = e.batchId, n = this.gl(i, "acknowledged");
        ge(0 === n);
        // Verify that the batch in the queue is the one to be acknowledged.
        this.Dn[n];
        return this.lastStreamToken = s, ke.resolve();
    }
    Oh(t) {
        return ke.resolve(this.lastStreamToken);
    }
    qh(t, e) {
        return this.lastStreamToken = e, ke.resolve();
    }
    gh(t, e, s, i) {
        const n = this.Vl;
        if (this.Vl++, this.Dn.length > 0) {
            this.Dn[this.Dn.length - 1];
        }
        const r = new $e(n, e, s, i);
        this.Dn.push(r);
        // Track references by document key and index collection parents.
        for (const e of i) this.pl = this.pl.add(new Xe(e.key, n)), this.Fn.hh(t, e.key.path.k());
        return ke.resolve(r);
    }
    $h(t, e) {
        return ke.resolve(this.bl(e));
    }
    so(t, e) {
        const s = e + 1, i = this.vl(s), n = i < 0 ? 0 : i;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return ke.resolve(this.Dn.length > n ? this.Dn[n] : null);
    }
    kh() {
        return ke.resolve(0 === this.Dn.length ? -1 : this.Vl - 1);
    }
    Ah(t) {
        return ke.resolve(this.Dn.slice());
    }
    $n(t, e) {
        const s = new Xe(e, 0), i = new Xe(e, Number.POSITIVE_INFINITY), n = [];
        return this.pl.Ge([ s, i ], t => {
            const e = this.bl(t.yo);
            n.push(e);
        }), ke.resolve(n);
    }
    xn(t, e) {
        let s = new Qt(Se);
        return e.forEach(t => {
            const e = new Xe(t, 0), i = new Xe(t, Number.POSITIVE_INFINITY);
            this.pl.Ge([ e, i ], t => {
                s = s.add(t.yo);
            });
        }), ke.resolve(this.Sl(s));
    }
    Gn(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        const s = e.path, i = s.length + 1;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
        let n = s;
        C.et(n) || (n = n.child(""));
        const r = new Xe(new C(n), 0);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                let h = new Qt(Se);
        return this.pl.He(t => {
            const e = t.key.path;
            return !!s.B(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === i && (h = h.add(t.yo)), !0);
        }, r), ke.resolve(this.Sl(h));
    }
    Sl(t) {
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
        const e = [];
        return t.forEach(t => {
            const s = this.bl(t);
            null !== s && e.push(s);
        }), e;
    }
    Lh(t, e) {
        ge(0 === this.gl(e.batchId, "removed")), this.Dn.shift();
        let s = this.pl;
        return ke.forEach(e.mutations, i => {
            const n = new Xe(i.key, e.batchId);
            return s = s.delete(n), this.zh.Cl(t, i.key);
        }).next(() => {
            this.pl = s;
        });
    }
    Dl(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }
    po(t, e) {
        const s = new Xe(e, 0), i = this.pl.Ke(s);
        return ke.resolve(e.isEqual(i && i.key));
    }
    Fh(t) {
        return this.Dn.length, ke.resolve();
    }
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId The batchId to search for
     * @param action A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */    gl(t, e) {
        return this.vl(t);
    }
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @return The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */    vl(t) {
        if (0 === this.Dn.length) 
        // As an index this is past the end of the queue
        return 0;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
                return t - this.Dn[0].batchId;
    }
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */    bl(t) {
        const e = this.vl(t);
        return e < 0 || e >= this.Dn.length ? null : this.Dn[e];
    }
}

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
 */ class ui {
    /**
     * @param sizer Used to assess the size of a document. For eager GC, this is expected to just
     * return 0 to avoid unnecessarily doing the work of calculating the size.
     */
    constructor(t, e) {
        this.Fn = t, this.Fl = e, 
        /** Underlying cache of documents and their read times. */
        this.docs = new xt(C.N), 
        /** Size of all cached documents. */
        this.size = 0;
    }
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    Hh(t, e, s) {
        const i = e.key, n = this.docs.get(i), r = n ? n.size : 0, h = this.Fl(e);
        return this.docs = this.docs.Re(i, {
            Nl: e,
            size: h,
            readTime: s
        }), this.size += h - r, this.Fn.hh(t, i.path.k());
    }
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    Gh(t) {
        const e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }
    kn(t, e) {
        const s = this.docs.get(e);
        return ke.resolve(s ? s.Nl : null);
    }
    getEntries(t, e) {
        let s = Ht();
        return e.forEach(t => {
            const e = this.docs.get(t);
            s = s.Re(t, e ? e.Nl : null);
        }), ke.resolve(s);
    }
    Bn(t, e, s) {
        let i = zt();
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
                const n = new C(e.path.child("")), r = this.docs.ve(n);
        for (;r.$e(); ) {
            const {key: t, value: {Nl: n, readTime: h}} = r.Ne();
            if (!e.path.B(t.path)) break;
            h.S(s) <= 0 || n instanceof At && e.matches(n) && (i = i.Re(n.key, n));
        }
        return ke.resolve(i);
    }
    $l(t, e) {
        return ke.forEach(this.docs, t => e(t));
    }
    Sh(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new ui.Ll(this);
    }
    kl(t) {
        return ke.resolve(this.size);
    }
}

/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */ ui.Ll = class extends class {
    constructor() {
        // A mapping of document key to the new cache entry that should be written (or null if any
        // existing cache entry should be removed).
        this.bh = new Ne(t => t.toString()), this.Ol = !1;
    }
    set readTime(t) {
        this.ql = t;
    }
    get readTime() {
        return this.ql;
    }
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    Hh(t, e) {
        this.Ml(), this.readTime = e, this.bh.set(t.key, t);
    }
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    Gh(t, e) {
        this.Ml(), e && (this.readTime = e), this.bh.set(t, null);
    }
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKey The key of the entry to look up.
     * @return The cached Document or NoDocument entry, or null if we have nothing
     * cached.
     */    kn(t, e) {
        this.Ml();
        const s = this.bh.get(e);
        return void 0 !== s ? ke.resolve(s) : this.xl(t, e);
    }
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys The keys of the entries to look up.
     * @return A map of cached `Document`s or `NoDocument`s, indexed by key. If an
     *     entry cannot be found, the corresponding key will be mapped to a null
     *     value.
     */    getEntries(t, e) {
        return this.Bl(t, e);
    }
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */    apply(t) {
        return this.Ml(), this.Ol = !0, this.fc(t);
    }
    /** Helper to assert this.changes is not null  */    Ml() {}
}
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
 */ {
    constructor(t) {
        super(), this.Ul = t;
    }
    fc(t) {
        const e = [];
        return this.bh.forEach((s, i) => {
            i ? e.push(this.Ul.Hh(t, i, this.readTime)) : this.Ul.Gh(s);
        }), ke.vn(e);
    }
    xl(t, e) {
        return this.Ul.kn(t, e);
    }
    Bl(t, e) {
        return this.Ul.getEntries(t, e);
    }
};

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
class ci {
    constructor(t) {
        this.persistence = t, 
        /**
         * Maps a target to the data about that target
         */
        this.Ql = new Ne(t => t.canonicalId()), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = y.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.Wl = 0, 
        /**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */
        this.jl = new Ye, this.targetCount = 0, this.Gl = je.ih();
    }
    js(t, e) {
        return this.Ql.forEach((t, s) => e(s)), ke.resolve();
    }
    Mh(t) {
        return ke.resolve(this.lastRemoteSnapshotVersion);
    }
    Hl(t) {
        return ke.resolve(this.Wl);
    }
    ho(t) {
        return this.highestTargetId = this.Gl.next(), ke.resolve(this.highestTargetId);
    }
    Yh(t, e, s) {
        return s && (this.lastRemoteSnapshotVersion = s), e > this.Wl && (this.Wl = e), 
        ke.resolve();
    }
    Kl(t) {
        this.Ql.set(t.target, t);
        const e = t.targetId;
        e > this.highestTargetId && (this.Gl = new je(e), this.highestTargetId = e), t.sequenceNumber > this.Wl && (this.Wl = t.sequenceNumber);
    }
    oo(t, e) {
        return this.Kl(e), this.targetCount += 1, ke.resolve();
    }
    jh(t, e) {
        return this.Kl(e), ke.resolve();
    }
    zl(t, e) {
        return this.Ql.delete(e.target), this.jl.Ao(e.targetId), this.targetCount -= 1, 
        ke.resolve();
    }
    Yl(t, e, s) {
        let i = 0;
        const n = [];
        return this.Ql.forEach((r, h) => {
            h.sequenceNumber <= e && null === s.get(h.targetId) && (this.Ql.delete(r), n.push(this.Xl(t, h.targetId)), 
            i++);
        }), ke.vn(n).next(() => i);
    }
    Jl(t) {
        return ke.resolve(this.targetCount);
    }
    ro(t, e) {
        const s = this.Ql.get(e) || null;
        return ke.resolve(s);
    }
    Uh(t, e, s) {
        return this.jl.mo(e, s), ke.resolve();
    }
    Bh(t, e, s) {
        this.jl.Ro(e, s);
        const i = this.persistence.zh, n = [];
        return i && e.forEach(e => {
            n.push(i.Cl(t, e));
        }), ke.vn(n);
    }
    Xl(t, e) {
        return this.jl.Ao(e), ke.resolve();
    }
    co(t, e) {
        const s = this.jl.Vo(e);
        return ke.resolve(s);
    }
    po(t, e) {
        return ke.resolve(this.jl.po(e));
    }
}

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
/**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
class li {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    constructor(t) {
        this.Zl = {}, this.t_ = new Me(0), this.e_ = !1, this.e_ = !0, this.zh = t(this), 
        this.Th = new ci(this);
        this.Fn = new Ge, this.Cn = new ui(this.Fn, t => this.zh.s_(t));
    }
    start() {
        return Promise.resolve();
    }
    Pu() {
        // No durable state to ensure is closed on shutdown.
        return this.e_ = !1, Promise.resolve();
    }
    get i_() {
        return this.e_;
    }
    n_() {
        // No op.
    }
    mh() {
        return this.Fn;
    }
    _h(t) {
        let e = this.Zl[t.s()];
        return e || (e = new ai(this.Fn, this.zh), this.Zl[t.s()] = e), e;
    }
    wh() {
        return this.Th;
    }
    dh() {
        return this.Cn;
    }
    runTransaction(t, e, s) {
        Pe("MemoryPersistence", "Starting transaction:", t);
        const i = new _i(this.t_.next());
        return this.zh.r_(), s(i).next(t => this.zh.h_(i).next(() => t)).gn().then(t => (i.o_(), 
        t));
    }
    a_(t, e) {
        return ke.Sn(Object.values(this.Zl).map(s => () => s.po(t, e)));
    }
}

/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */ class _i extends 
/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */
class {
    constructor() {
        this.u_ = [];
    }
    c_(t) {
        this.u_.push(t);
    }
    o_() {
        this.u_.forEach(t => t());
    }
} {
    constructor(t) {
        super(), this.Qh = t;
    }
}

class fi {
    constructor(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.l_ = new Ye, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.__ = null;
    }
    static f_(t) {
        return new fi(t);
    }
    get d_() {
        if (this.__) return this.__;
        throw ye();
    }
    Zh(t, e, s) {
        return this.l_.Zh(s, e), this.d_.delete(s), ke.resolve();
    }
    to(t, e, s) {
        return this.l_.to(s, e), this.d_.add(s), ke.resolve();
    }
    Cl(t, e) {
        return this.d_.add(e), ke.resolve();
    }
    removeTarget(t, e) {
        this.l_.Ao(e.targetId).forEach(t => this.d_.add(t));
        const s = this.persistence.wh();
        return s.co(t, e.targetId).next(t => {
            t.forEach(t => this.d_.add(t));
        }).next(() => s.zl(t, e));
    }
    r_() {
        this.__ = new Set;
    }
    h_(t) {
        // Remove newly orphaned documents.
        const e = this.persistence.dh().Sh();
        return ke.forEach(this.d_, s => this.T_(t, s).next(t => {
            t || e.Gh(s);
        })).next(() => (this.__ = null, e.apply(t)));
    }
    Kh(t, e) {
        return this.T_(t, e).next(t => {
            t ? this.d_.delete(e) : this.d_.add(e);
        });
    }
    s_(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }
    T_(t, e) {
        return ke.Sn([ () => ke.resolve(this.l_.po(e)), () => this.persistence.wh().po(t, e), () => this.persistence.a_(t, e) ]);
    }
}

/**
 * @license
 * Copyright 2020 Google LLC
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
/**
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */
class di {
    async initialize(t) {
        this.Sc = this.w_(t), this.persistence = this.E_(t), await this.persistence.start(), 
        this.m_ = this.I_(t), this.Ja = this.R_(t), this.Ac = this.A_(t), this.gu = this.P_(t), 
        this.V_ = this.p_(t), this.Sc.Qa = t => this.gu.Ec(t, 1 /* SharedClientState */), 
        this.Ac.gu = this.gu, await this.Ja.start(), await this.Sc.start(), await this.Ac.start(), 
        await this.Ac.Uu(this.gu.Bc);
    }
    p_(t) {
        return new ri(this.gu);
    }
    I_(t) {
        return null;
    }
    R_(t) {
        return new Ke(this.persistence, new oi, t.y_);
    }
    E_(t) {
        return new li(fi.f_);
    }
    A_(t) {
        return new Ks(this.Ja, t.$a, t.Tr, t => this.gu.Ec(t, 0 /* RemoteStore */), t.platform.g_());
    }
    w_(t) {
        return new Ys;
    }
    P_(t) {
        return new ii(this.Ja, this.Ac, this.Sc, t.y_, t.Cc);
    }
    clearPersistence(t) {
        throw new m(E.FAILED_PRECONDITION, "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.");
    }
}

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
/**
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */
class Ti {
    constructor(t, e, s, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    i) {
        this.platform = t, this.b_ = e, this.credentials = s, this.Tr = i, this.clientId = ve.cn();
    }
    /**
     * Starts up the FirestoreClient, returning only whether or not enabling
     * persistence succeeded.
     *
     * The intent here is to "do the right thing" as far as users are concerned.
     * Namely, in cases where offline persistence is requested and possible,
     * enable it, but otherwise fall back to persistence disabled. For the most
     * part we expect this to succeed one way or the other so we don't expect our
     * users to actually wait on the firestore.enablePersistence Promise since
     * they generally won't care.
     *
     * Of course some users actually do care about whether or not persistence
     * was successfully enabled, so the Promise returned from this method
     * indicates this outcome.
     *
     * This presents a problem though: even before enablePersistence resolves or
     * rejects, users may have made calls to e.g. firestore.collection() which
     * means that the FirestoreClient in there will be available and will be
     * enqueuing actions on the async queue.
     *
     * Meanwhile any failure of an operation on the async queue causes it to
     * panic and reject any further work, on the premise that unhandled errors
     * are fatal.
     *
     * Consequently the fallback is handled internally here in start, and if the
     * fallback succeeds we signal success to the async queue even though the
     * start() itself signals failure.
     *
     * @param componentProvider Provider that returns all core components.
     * @param persistenceSettings Settings object to configure offline
     *     persistence.
     * @returns A deferred result indicating the user-visible result of enabling
     *     offline persistence. This method will reject this if IndexedDB fails to
     *     start for any reason. If usePersistence is false this is
     *     unconditionally resolved.
     */    start(t, e) {
        this.v_();
        // We defer our initialization until we get the current user from
        // setChangeListener(). We block the async queue until we got the initial
        // user and the initialization is completed. This will prevent any scheduled
        // work from happening before initialization is completed.
        // If initializationDone resolved then the FirestoreClient is in a usable
        // state.
        const s = new xe, i = new xe;
        // If usePersistence is true, certain classes of errors while starting are
        // recoverable but only by falling back to persistence disabled.
        
        // If there's an error in the first case but not in recovery we cannot
        // reject the promise blocking the async queue because this will cause the
        // async queue to panic.
                let n = !1;
        // Return only the result of enabling persistence. Note that this does not
        // need to await the completion of initializationDone because the result of
        // this method should not reflect any other kind of failure to start.
        return this.credentials._(r => {
            if (!n) return n = !0, Pe("FirestoreClient", "Initializing. user=", r.uid), this.S_(t, e, r, i).then(s.resolve, s.reject);
            this.Tr.Vr(() => this.Bu(r));
        }), 
        // Block the async queue until initialization is done
        this.Tr.Vr(() => s.promise), i.promise;
    }
    /** Enables the network connection and requeues all pending operations. */    enableNetwork() {
        return this.v_(), this.Tr.enqueue(() => this.gu.enableNetwork());
    }
    /**
     * Initializes persistent storage, attempting to use IndexedDB if
     * usePersistence is true or memory-only if false.
     *
     * If IndexedDB fails because it's already open in another tab or because the
     * platform can't possibly support our implementation then this method rejects
     * the persistenceResult and falls back on memory-only persistence.
     *
     * @param componentProvider The provider that provides all core componennts
     *     for IndexedDB or memory-backed persistence
     * @param persistenceSettings Settings object to configure offline persistence
     * @param user The initial user
     * @param persistenceResult A deferred result indicating the user-visible
     *     result of enabling offline persistence. This method will reject this if
     *     IndexedDB fails to start for any reason. If usePersistence is false
     *     this is unconditionally resolved.
     * @returns a Promise indicating whether or not initialization should
     *     continue, i.e. that one of the persistence implementations actually
     *     succeeded.
     */    async S_(t, e, s, i) {
        try {
            // TODO(mrschmidt): Ideally, ComponentProvider would also initialize
            // Datastore (without duplicating the initializing logic once per
            // provider).
            const n = await this.platform.C_(this.b_), r = this.platform.Go(this.b_.ii), h = function(t, e, s) {
                return new js(t, e, s);
            }(n, this.credentials, r);
            await t.initialize({
                Tr: this.Tr,
                b_: this.b_,
                platform: this.platform,
                $a: h,
                clientId: this.clientId,
                y_: s,
                Cc: 100,
                D_: e
            }), this.persistence = t.persistence, this.Sc = t.Sc, this.Ja = t.Ja, this.Ac = t.Ac, 
            this.gu = t.gu, this.m_ = t.m_, this.F_ = t.V_, 
            // When a user calls clearPersistence() in one client, all other clients
            // need to be terminated to allow the delete to succeed.
            this.persistence.n_(async () => {
                await this.terminate();
            }), i.resolve();
        } catch (t) {
            // An unknown failure on the first stage shuts everything down.
            if (
            // Regardless of whether or not the retry succeeds, from an user
            // perspective, offline persistence has failed.
            i.reject(t), !this.N_(t)) throw t;
            return console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + t), 
            this.S_(new di, {
                L_: !1
            }, s, i);
        }
    }
    /**
     * Decides whether the provided error allows us to gracefully disable
     * persistence (as opposed to crashing the client).
     */    N_(t) {
        return "FirebaseError" === t.name ? t.code === E.FAILED_PRECONDITION || t.code === E.UNIMPLEMENTED : !("undefined" != typeof DOMException && t instanceof DOMException) || (
        // When the browser is out of quota we could get either quota exceeded
        // or an aborted error depending on whether the error happened during
        // schema migration.
        22 === t.code || 20 === t.code || 
        // Firefox Private Browsing mode disables IndexedDb and returns
        // INVALID_STATE for any usage.
        11 === t.code);
    }
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */    v_() {
        if (this.Tr.$r) throw new m(E.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    Bu(t) {
        return this.Tr.Ur(), Pe("FirestoreClient", "Credential Changed. Current user: " + t.uid), 
        this.gu.Bu(t);
    }
    /** Disables the network connection. Pending operations will not complete. */    disableNetwork() {
        return this.v_(), this.Tr.enqueue(() => this.gu.disableNetwork());
    }
    terminate() {
        return this.Tr.Mr(async () => {
            // PORTING NOTE: LocalStore does not need an explicit shutdown on web.
            this.m_ && this.m_.stop(), await this.Ac.Pu(), await this.Sc.Pu(), await this.persistence.Pu(), 
            // `removeChangeListener` must be called after shutting down the
            // RemoteStore as it will prevent the RemoteStore from retrieving
            // auth tokens.
            this.credentials.T();
        });
    }
    /**
     * Returns a Promise that resolves when all writes that were pending at the time this
     * method was called received server acknowledgement. An acknowledgement can be either acceptance
     * or rejection.
     */    waitForPendingWrites() {
        this.v_();
        const t = new xe;
        return this.Tr.Vr(() => this.gu.Jc(t)), t.promise;
    }
    listen(t, e, s) {
        this.v_();
        const i = new hi(t, e, s);
        return this.Tr.Vr(() => this.F_.listen(i)), i;
    }
    pu(t) {
        // Checks for termination but does not raise error, allowing unlisten after
        // termination to be a no-op.
        this.k_ || this.Tr.Vr(() => this.F_.pu(t));
    }
    O_(t) {
        return this.v_(), this.Tr.enqueue(() => this.Ja.io(t)).then(t => {
            if (t instanceof At) return t;
            if (t instanceof Pt) return null;
            throw new m(E.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)");
        });
    }
    q_(t) {
        return this.v_(), this.Tr.enqueue(async () => {
            const e = await this.Ja.uo(t, 
            /* usePreviousResults= */ !0), s = new Zs(t, e.lo), i = s.uc(e.documents);
            return s.fc(i, 
            /* updateLimboDocuments= */ !1).snapshot;
        });
    }
    write(t) {
        this.v_();
        const e = new xe;
        return this.Tr.Vr(() => this.gu.write(t, e)), e.promise;
    }
    ii() {
        return this.b_.ii;
    }
    ll(t) {
        this.v_(), this.Tr.Vr(() => (this.F_.ll(t), Promise.resolve()));
    }
    _l(t) {
        // Checks for shutdown but does not raise error, allowing remove after
        // shutdown to be a no-op.
        this.k_ || this.F_._l(t);
    }
    get k_() {
        // Technically, the asyncQueue is still running, but only accepting operations
        // related to termination or supposed to be run after termination. It is effectively
        // terminated to the eyes of users.
        return this.Tr.$r;
    }
    transaction(t) {
        this.v_();
        const e = new xe;
        return this.Tr.Vr(() => (this.gu.runTransaction(this.Tr, t, e), Promise.resolve())), 
        e.promise;
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */ class wi {
    constructor(t) {
        this.observer = t, 
        /**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */
        this.muted = !1;
    }
    next(t) {
        this.M_(this.observer.next, t);
    }
    error(t) {
        this.M_(this.observer.error, t);
    }
    x_() {
        this.muted = !0;
    }
    M_(t, e) {
        this.muted || setTimeout(() => {
            this.muted || t(e);
        }, 0);
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
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
 */ function Ei(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        const s = t;
        for (const t of e) if (t in s && "function" == typeof s[t]) return !0;
        return !1;
    }
    /**
 * @license
 * Copyright 2020 Google LLC
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
    /**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 */ (t, [ "next", "error", "complete" ]);
}

class mi {
    constructor(t, e, s, i) {
        this.firestore = t, this.timestampsInSnapshots = e, this.B_ = s, this.converter = i;
    }
    U_(t) {
        switch (x(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return K(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.Q_(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.W_(t);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return new Is(z(t.bytesValue));

          case 7 /* RefValue */ :
            return this.j_(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.G_(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.H_(t.arrayValue);

          case 10 /* ObjectValue */ :
            return this.K_(t.mapValue);

          default:
            throw ye();
        }
    }
    K_(t) {
        const e = {};
        return F(t.fields || {}, (t, s) => {
            e[t] = this.U_(s);
        }), e;
    }
    G_(t) {
        return new vs(K(t.latitude), K(t.longitude));
    }
    H_(t) {
        return (t.values || []).map(t => this.U_(t));
    }
    W_(t) {
        switch (this.B_) {
          case "previous":
            const e = function t(e) {
                const s = e.mapValue.fields.__previous_value__;
                return O(s) ? t(s) : s;
            }(t);
            return null == e ? null : this.U_(e);

          case "estimate":
            return this.Q_(q(t));

          default:
            return null;
        }
    }
    Q_(t) {
        const e = H(t), s = new p(e.seconds, e.nanos);
        return this.timestampsInSnapshots ? s : s.toDate();
    }
    j_(t) {
        const e = b.G(t);
        ge(Ee(e));
        const s = new Fe(e.get(1), e.get(3)), i = new C(e.L(5));
        return s.isEqual(this.firestore.Zo) || 
        // TODO(b/64130202): Somehow support foreign references.
        Ve(`Document ${i} contains a document ` + "reference within a different database (" + `${s.projectId}/${s.database}) which is not ` + "supported. It will be treated as a reference in the current " + `database (${this.firestore.Zo.projectId}/${this.firestore.Zo.database}) ` + "instead."), 
        new pi(i, this.firestore, this.converter);
    }
}

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
// settings() defaults:
const Ii = We.Jr;

/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied firestore.Settings object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
class Ri {
    constructor(t) {
        var e, s;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new m(E.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = !0;
        } else ns("settings", "non-empty string", "host", t.host), this.host = t.host, rs("settings", "boolean", "ssl", t.ssl), 
        this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (_s("settings", t, [ "host", "ssl", "credentials", "timestampsInSnapshots", "cacheSizeBytes", "experimentalForceLongPolling" ]), 
        rs("settings", "object", "credentials", t.credentials), this.credentials = t.credentials, 
        rs("settings", "boolean", "timestampsInSnapshots", t.timestampsInSnapshots), 
        // Nobody should set timestampsInSnapshots anymore, but the error depends on
        // whether they set it to true or false...
        !0 === t.timestampsInSnapshots ? Ve("The setting 'timestampsInSnapshots: true' is no longer required and should be removed.") : !1 === t.timestampsInSnapshots && Ve("Support for 'timestampsInSnapshots: false' will be removed soon. You must update your code to handle Timestamp objects."), 
        this.timestampsInSnapshots = null === (s = t.timestampsInSnapshots) || void 0 === s || s, 
        rs("settings", "number", "cacheSizeBytes", t.cacheSizeBytes), void 0 === t.cacheSizeBytes) this.cacheSizeBytes = We.th; else {
            if (t.cacheSizeBytes !== Ii && t.cacheSizeBytes < We.Zr) throw new m(E.INVALID_ARGUMENT, `cacheSizeBytes must be at least ${We.Zr}`);
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        rs("settings", "boolean", "experimentalForceLongPolling", t.experimentalForceLongPolling), 
        this.forceLongPolling = void 0 !== t.experimentalForceLongPolling && t.experimentalForceLongPolling;
    }
    isEqual(t) {
        return this.host === t.host && this.ssl === t.ssl && this.timestampsInSnapshots === t.timestampsInSnapshots && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.forceLongPolling === t.forceLongPolling;
    }
}

/**
 * The root reference to the database.
 */ class Ai {
    // Note: We are using `MemoryComponentProvider` as a default
    // ComponentProvider to ensure backwards compatibility with the format
    // expected by the console build.
    constructor(t, e, s = new di) {
        if (this.z_ = null, 
        // Public for use in tests.
        // TODO(mikelehen): Use modularized initialization instead.
        this.Y_ = new Qe, this.INTERNAL = {
            delete: async () => {
                // The client must be initalized to ensure that all subsequent API usage
                // throws an exception.
                this.X_(), await this.J_.terminate();
            }
        }, "object" == typeof t.options) {
            // This is very likely a Firebase app object
            // TODO(b/34177605): Can we somehow use instanceof?
            const s = t;
            this.z_ = s, this.Zo = Ai.Z_(s), this.tf = s.name, this.ef = new A(e);
        } else {
            const e = t;
            if (!e.projectId) throw new m(E.INVALID_ARGUMENT, "Must provide projectId");
            this.Zo = new Fe(e.projectId, e.database), 
            // Use a default persistenceKey that lines up with FirebaseApp.
            this.tf = "[DEFAULT]", this.ef = new R;
        }
        this.sf = s, this.if = new Ri({}), this.nf = new $s(this.Zo);
    }
    settings(t) {
        Ze("Firestore.settings", arguments, 1), ss("Firestore.settings", "object", 1, t);
        const e = new Ri(t);
        if (this.J_ && !this.if.isEqual(e)) throw new m(E.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only call settings() before calling any other methods on a Firestore object.");
        this.if = e, void 0 !== e.credentials && (this.ef = function(t) {
            if (!t) return new R;
            switch (t.type) {
              case "gapi":
                const e = t.rf;
                // Make sure this really is a Gapi client.
                                return ge(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new V(e, t.V || "0");

              case "provider":
                return t.rf;

              default:
                throw new m(E.INVALID_ARGUMENT, "makeCredentialsProvider failed due to invalid credential type");
            }
        }
        /**
 * @license
 * Copyright 2017 Google Inc.
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
        // The earlist date supported by Firestore timestamps (0001-01-01T00:00:00Z).
        (e.credentials));
    }
    enableNetwork() {
        return this.X_(), this.J_.enableNetwork();
    }
    disableNetwork() {
        return this.X_(), this.J_.disableNetwork();
    }
    enablePersistence(t) {
        var e, s;
        if (this.J_) throw new m(E.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only call enablePersistence() before calling any other methods on a Firestore object.");
        let i = !1;
        return t && (void 0 !== t.experimentalTabSynchronization && Ve("The 'experimentalTabSynchronization' setting will be removed. Use 'synchronizeTabs' instead."), 
        i = null !== (s = null !== (e = t.synchronizeTabs) && void 0 !== e ? e : t.experimentalTabSynchronization) && void 0 !== s && s), 
        this.hf(this.sf, {
            L_: !0,
            cacheSizeBytes: this.if.cacheSizeBytes,
            synchronizeTabs: i
        });
    }
    async clearPersistence() {
        if (void 0 !== this.J_ && !this.J_.k_) throw new m(E.FAILED_PRECONDITION, "Persistence cannot be cleared after this Firestore instance is initialized.");
        const t = new xe;
        return this.Y_.Lr(async () => {
            try {
                const e = this.af();
                await this.sf.clearPersistence(e), t.resolve();
            } catch (e) {
                t.reject(e);
            }
        }), t.promise;
    }
    terminate() {
        return this.app._removeServiceInstance("firestore"), this.INTERNAL.delete();
    }
    get uf() {
        return this.X_(), this.J_.k_;
    }
    waitForPendingWrites() {
        return this.X_(), this.J_.waitForPendingWrites();
    }
    onSnapshotsInSync(t) {
        if (this.X_(), Ei(t)) return this.cf(t);
        {
            ss("Firestore.onSnapshotsInSync", "function", 1, t);
            const e = {
                next: t
            };
            return this.cf(e);
        }
    }
    cf(t) {
        const e = new wi({
            next: () => {
                t.next && t.next();
            },
            error: t => {
                throw ye();
            }
        });
        return this.J_.ll(e), () => {
            e.x_(), this.J_._l(e);
        };
    }
    X_() {
        return this.J_ || 
        // Kick off starting the client but don't actually wait for it.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hf(new di, {
            L_: !1
        }), this.J_;
    }
    af() {
        return new De(this.Zo, this.tf, this.if.host, this.if.ssl, this.if.forceLongPolling);
    }
    hf(t, e) {
        const s = this.af();
        return this.J_ = new Ti(me.nt(), s, this.ef, this.Y_), this.J_.start(t, e);
    }
    static Z_(t) {
        if (e = t.options, s = "projectId", !Object.prototype.hasOwnProperty.call(e, s)) throw new m(E.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
        var e, s;
        /**
 * @license
 * Copyright 2017 Google Inc.
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
        /**
 * Helper function to prevent instantiation through the constructor.
 *
 * This method creates a new constructor that throws when it's invoked.
 * The prototype of that constructor is then set to the prototype of the hidden
 * "class" to expose all the prototype methods and allow for instanceof
 * checks.
 *
 * To also make all the static methods available, all properties of the
 * original constructor are copied to the new constructor.
 */        const i = t.options.projectId;
        if (!i || "string" != typeof i) throw new m(E.INVALID_ARGUMENT, "projectId must be a string in FirebaseApp.options");
        return new Fe(i);
    }
    get app() {
        if (!this.z_) throw new m(E.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this.z_;
    }
    collection(t) {
        return Ze("Firestore.collection", arguments, 1), ss("Firestore.collection", "non-empty string", 1, t), 
        this.X_(), new Ci(b.G(t), this);
    }
    doc(t) {
        return Ze("Firestore.doc", arguments, 1), ss("Firestore.doc", "non-empty string", 1, t), 
        this.X_(), pi.lf(b.G(t), this);
    }
    collectionGroup(t) {
        if (Ze("Firestore.collectionGroup", arguments, 1), ss("Firestore.collectionGroup", "non-empty string", 1, t), 
        t.indexOf("/") >= 0) throw new m(E.INVALID_ARGUMENT, `Invalid collection ID '${t}' passed to function ` + "Firestore.collectionGroup(). Collection IDs must not contain '/'.");
        return this.X_(), new vi(new yt(b.H, t), this);
    }
    runTransaction(t) {
        return Ze("Firestore.runTransaction", arguments, 1), ss("Firestore.runTransaction", "function", 1, t), 
        this.X_().transaction(e => t(new Pi(this, e)));
    }
    batch() {
        return this.X_(), new Vi(this);
    }
    static get logLevel() {
        switch (Re()) {
          case s.DEBUG:
            return "debug";

          case s.SILENT:
            return "silent";

          default:
            // The default log level is error
            return "error";
        }
    }
    static setLogLevel(t) {
        switch (Ze("Firestore.setLogLevel", arguments, 1), ss("Firestore.setLogLevel", "non-empty string", 1, t), 
        t) {
          case "debug":
            Ae(s.DEBUG);
            break;

          case "error":
            Ae(s.ERROR);
            break;

          case "silent":
            Ae(s.SILENT);
            break;

          default:
            throw new m(E.INVALID_ARGUMENT, "Invalid log level: " + t);
        }
    }
    // Note: this is not a property because the minifier can't work correctly with
    // the way TypeScript compiler outputs properties.
    _f() {
        return this.if.timestampsInSnapshots;
    }
}

/**
 * A reference to a transaction.
 */ class Pi {
    constructor(t, e) {
        this.ff = t, this.df = e;
    }
    get(t) {
        Ze("Transaction.get", arguments, 1);
        const e = $i("Transaction.get", t, this.ff);
        return this.df.Ma([ e.ta ]).then(t => {
            if (!t || 1 !== t.length) return ye();
            const s = t[0];
            if (s instanceof Pt) return new gi(this.ff, e.ta, null, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, e.Tf);
            if (s instanceof At) return new gi(this.ff, e.ta, s, 
            /* fromCache= */ !1, 
            /* hasPendingWrites= */ !1, e.Tf);
            throw ye();
        });
    }
    set(t, e, s) {
        es("Transaction.set", arguments, 2, 3);
        const i = $i("Transaction.set", t, this.ff);
        s = Di("Transaction.set", s);
        const [n, r] = ki(i.Tf, e, "Transaction.set"), h = s.merge || s.mergeFields ? this.ff.nf.zo(r, n, s.mergeFields) : this.ff.nf.Ho(r, n);
        return this.df.set(i.ta, h), this;
    }
    update(t, e, s, ...i) {
        let n, r;
        return "string" == typeof e || e instanceof Rs ? (ts("Transaction.update", arguments, 3), 
        n = $i("Transaction.update", t, this.ff), r = this.ff.nf.Xo("Transaction.update", e, s, i)) : (Ze("Transaction.update", arguments, 2), 
        n = $i("Transaction.update", t, this.ff), r = this.ff.nf.Yo("Transaction.update", e)), 
        this.df.update(n.ta, r), this;
    }
    delete(t) {
        Ze("Transaction.delete", arguments, 1);
        const e = $i("Transaction.delete", t, this.ff);
        return this.df.delete(e.ta), this;
    }
}

class Vi {
    constructor(t) {
        this.ff = t, this.wf = [], this.Ef = !1;
    }
    set(t, e, s) {
        es("WriteBatch.set", arguments, 2, 3), this.mf();
        const i = $i("WriteBatch.set", t, this.ff);
        s = Di("WriteBatch.set", s);
        const [n, r] = ki(i.Tf, e, "WriteBatch.set"), h = s.merge || s.mergeFields ? this.ff.nf.zo(r, n, s.mergeFields) : this.ff.nf.Ho(r, n);
        return this.wf = this.wf.concat(h.Mo(i.ta, ct.dt())), this;
    }
    update(t, e, s, ...i) {
        let n, r;
        return this.mf(), "string" == typeof e || e instanceof Rs ? (ts("WriteBatch.update", arguments, 3), 
        n = $i("WriteBatch.update", t, this.ff), r = this.ff.nf.Xo("WriteBatch.update", e, s, i)) : (Ze("WriteBatch.update", arguments, 2), 
        n = $i("WriteBatch.update", t, this.ff), r = this.ff.nf.Yo("WriteBatch.update", e)), 
        this.wf = this.wf.concat(r.Mo(n.ta, ct.exists(!0))), this;
    }
    delete(t) {
        Ze("WriteBatch.delete", arguments, 1), this.mf();
        const e = $i("WriteBatch.delete", t, this.ff);
        return this.wf = this.wf.concat(new Tt(e.ta, ct.dt())), this;
    }
    commit() {
        return this.mf(), this.Ef = !0, this.wf.length > 0 ? this.ff.X_().write(this.wf) : Promise.resolve();
    }
    mf() {
        if (this.Ef) throw new m(E.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }
}

/**
 * A reference to a particular document in a collection in the database.
 */ class pi {
    constructor(t, e, s) {
        this.ta = t, this.firestore = e, this.Tf = s, this.J_ = this.firestore.X_();
    }
    static lf(t, e, s) {
        if (t.length % 2 != 0) throw new m(E.INVALID_ARGUMENT, "Invalid document reference. Document references must have an even number of segments, but " + `${t.j()} has ${t.length}`);
        return new pi(new C(t), e, s);
    }
    get id() {
        return this.ta.path.q();
    }
    get parent() {
        return new Ci(this.ta.path.k(), this.firestore, this.Tf);
    }
    get path() {
        return this.ta.path.j();
    }
    collection(t) {
        if (Ze("DocumentReference.collection", arguments, 1), ss("DocumentReference.collection", "non-empty string", 1, t), 
        !t) throw new m(E.INVALID_ARGUMENT, "Must provide a non-empty collection name to collection()");
        const e = b.G(t);
        return new Ci(this.ta.path.child(e), this.firestore);
    }
    isEqual(t) {
        if (!(t instanceof pi)) throw fs("isEqual", "DocumentReference", 1, t);
        return this.firestore === t.firestore && this.ta.isEqual(t.ta) && this.Tf === t.Tf;
    }
    set(t, e) {
        es("DocumentReference.set", arguments, 1, 2), e = Di("DocumentReference.set", e);
        const [s, i] = ki(this.Tf, t, "DocumentReference.set"), n = e.merge || e.mergeFields ? this.firestore.nf.zo(i, s, e.mergeFields) : this.firestore.nf.Ho(i, s);
        return this.J_.write(n.Mo(this.ta, ct.dt()));
    }
    update(t, e, ...s) {
        let i;
        return "string" == typeof t || t instanceof Rs ? (ts("DocumentReference.update", arguments, 2), 
        i = this.firestore.nf.Xo("DocumentReference.update", t, e, s)) : (Ze("DocumentReference.update", arguments, 1), 
        i = this.firestore.nf.Yo("DocumentReference.update", t)), this.J_.write(i.Mo(this.ta, ct.exists(!0)));
    }
    delete() {
        return Ze("DocumentReference.delete", arguments, 0), this.J_.write([ new Tt(this.ta, ct.dt()) ]);
    }
    onSnapshot(...t) {
        es("DocumentReference.onSnapshot", arguments, 1, 4);
        let e, s = {
            includeMetadataChanges: !1
        }, i = 0;
        "object" != typeof t[i] || Ei(t[i]) || (s = t[i], _s("DocumentReference.onSnapshot", s, [ "includeMetadataChanges" ]), 
        rs("DocumentReference.onSnapshot", "boolean", "includeMetadataChanges", s.includeMetadataChanges), 
        i++);
        const n = {
            includeMetadataChanges: s.includeMetadataChanges
        };
        return Ei(t[i]) ? e = t[i] : (ss("DocumentReference.onSnapshot", "function", i, t[i]), 
        is("DocumentReference.onSnapshot", "function", i + 1, t[i + 1]), is("DocumentReference.onSnapshot", "function", i + 2, t[i + 2]), 
        e = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.If(n, e);
    }
    If(t, e) {
        let s = t => {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (s = e.error.bind(e));
        const i = new wi({
            next: t => {
                if (e.next) {
                    const s = t.docs.get(this.ta);
                    e.next(new gi(this.firestore, this.ta, s, t.fromCache, t.hasPendingWrites, this.Tf));
                }
            },
            error: s
        }), n = this.J_.listen(yt.Wt(this.ta.path), i, t);
        return () => {
            i.x_(), this.J_.pu(n);
        };
    }
    get(t) {
        return es("DocumentReference.get", arguments, 0, 1), Ni("DocumentReference.get", t), 
        new Promise((e, s) => {
            t && "cache" === t.source ? this.firestore.X_().O_(this.ta).then(t => {
                e(new gi(this.firestore, this.ta, t, 
                /*fromCache=*/ !0, t instanceof At && t.At, this.Tf));
            }, s) : this.Rf(e, s, t);
        });
    }
    Rf(t, e, s) {
        const i = this.If({
            includeMetadataChanges: !0,
            Il: !0
        }, {
            next: n => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                i(), !n.exists && n.metadata.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                e(new m(E.UNAVAILABLE, "Failed to get document because the client is offline.")) : n.exists && n.metadata.fromCache && s && "server" === s.source ? e(new m(E.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : t(n);
            },
            error: e
        });
    }
    withConverter(t) {
        return new pi(this.ta, this.firestore, t);
    }
}

class yi {
    constructor(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    isEqual(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }
}

class gi {
    constructor(t, e, s, i, n, r) {
        this.ff = t, this.ta = e, this.Af = s, this.Pf = i, this.Vf = n, this.Tf = r;
    }
    data(t) {
        if (es("DocumentSnapshot.data", arguments, 0, 1), t = Fi("DocumentSnapshot.data", t), 
        this.Af) {
            // We only want to use the converter and create a new DocumentSnapshot
            // if a converter has been provided.
            if (this.Tf) {
                const e = new bi(this.ff, this.ta, this.Af, this.Pf, this.Vf);
                return this.Tf.fromFirestore(e, t);
            }
            return new mi(this.ff, this.ff._f(), t.serverTimestamps, 
            /* converter= */ void 0).U_(this.Af.kt());
        }
    }
    get(t, e) {
        if (es("DocumentSnapshot.get", arguments, 1, 2), e = Fi("DocumentSnapshot.get", e), 
        this.Af) {
            const s = this.Af.data().field(Ms("DocumentSnapshot.get", t));
            if (null !== s) {
                return new mi(this.ff, this.ff._f(), e.serverTimestamps, this.Tf).U_(s);
            }
        }
    }
    get id() {
        return this.ta.path.q();
    }
    get ref() {
        return new pi(this.ta, this.ff, this.Tf);
    }
    get exists() {
        return null !== this.Af;
    }
    get metadata() {
        return new yi(this.Vf, this.Pf);
    }
    isEqual(t) {
        if (!(t instanceof gi)) throw fs("isEqual", "DocumentSnapshot", 1, t);
        return this.ff === t.ff && this.Pf === t.Pf && this.ta.isEqual(t.ta) && (null === this.Af ? null === t.Af : this.Af.isEqual(t.Af)) && this.Tf === t.Tf;
    }
}

class bi extends gi {
    data(t) {
        return super.data(t);
    }
}

class vi {
    constructor(t, e, s) {
        this.pf = t, this.firestore = e, this.Tf = s;
    }
    where(t, e, s) {
        Ze("Query.where", arguments, 3), ls("Query.where", 3, s);
        // Enumerated from the WhereFilterOp type in index.d.ts.
        const i = function(t, e, s, i) {
            if (!e.some(t => t === i)) throw new m(E.INVALID_ARGUMENT, `Invalid value ${cs(i)} provided to function ` + `${t}() for its ${Ts(s)} argument. Acceptable ` + `values: ${e.join(", ")}`);
            return i;
        }("Query.where", [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , "==" /* EQUAL */ , ">=" /* GREATER_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , "array-contains" /* ARRAY_CONTAINS */ , "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], 2, e);
        let n;
        const r = Ms("Query.where", t);
        if (r.Y()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new m(E.INVALID_ARGUMENT, `Invalid Query. You can't perform '${i}' ` + "queries on FieldPath.documentId().");
            if ("in" /* IN */ === i) {
                this.yf(s, i);
                const t = [];
                for (const e of s) t.push(this.gf(e));
                n = {
                    arrayValue: {
                        values: t
                    }
                };
            } else n = this.gf(s);
        } else "in" /* IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || this.yf(s, i), 
        n = this.firestore.nf.Jo("Query.where", s, 
        // We only allow nested arrays for IN queries.
        /** allowArrays = */ "in" /* IN */ === i);
        const h = gt.create(r, i, n);
        return this.bf(h), new vi(this.pf.Ht(h), this.firestore, this.Tf);
    }
    orderBy(t, e) {
        let s;
        if (es("Query.orderBy", arguments, 1, 2), is("Query.orderBy", "non-empty string", 2, e), 
        void 0 === e || "asc" === e) s = "asc" /* ASCENDING */; else {
            if ("desc" !== e) throw new m(E.INVALID_ARGUMENT, `Function Query.orderBy() has unknown direction '${e}', ` + "expected 'asc' or 'desc'.");
            s = "desc" /* DESCENDING */;
        }
        if (null !== this.pf.startAt) throw new m(E.INVALID_ARGUMENT, "Invalid query. You must not call Query.startAt() or Query.startAfter() before calling Query.orderBy().");
        if (null !== this.pf.endAt) throw new m(E.INVALID_ARGUMENT, "Invalid query. You must not call Query.endAt() or Query.endBefore() before calling Query.orderBy().");
        const i = Ms("Query.orderBy", t), n = new Nt(i, s);
        return this.vf(n), new vi(this.pf.Kt(n), this.firestore, this.Tf);
    }
    limit(t) {
        return Ze("Query.limit", arguments, 1), ss("Query.limit", "number", 1, t), ds("Query.limit", 1, t), 
        new vi(this.pf.zt(t), this.firestore, this.Tf);
    }
    limitToLast(t) {
        return Ze("Query.limitToLast", arguments, 1), ss("Query.limitToLast", "number", 1, t), 
        ds("Query.limitToLast", 1, t), new vi(this.pf.Yt(t), this.firestore, this.Tf);
    }
    startAt(t, ...e) {
        ts("Query.startAt", arguments, 1);
        const s = this.Sf("Query.startAt", t, e, 
        /*before=*/ !0);
        return new vi(this.pf.Xt(s), this.firestore, this.Tf);
    }
    startAfter(t, ...e) {
        ts("Query.startAfter", arguments, 1);
        const s = this.Sf("Query.startAfter", t, e, 
        /*before=*/ !1);
        return new vi(this.pf.Xt(s), this.firestore, this.Tf);
    }
    endBefore(t, ...e) {
        ts("Query.endBefore", arguments, 1);
        const s = this.Sf("Query.endBefore", t, e, 
        /*before=*/ !0);
        return new vi(this.pf.Jt(s), this.firestore, this.Tf);
    }
    endAt(t, ...e) {
        ts("Query.endAt", arguments, 1);
        const s = this.Sf("Query.endAt", t, e, 
        /*before=*/ !1);
        return new vi(this.pf.Jt(s), this.firestore, this.Tf);
    }
    isEqual(t) {
        if (!(t instanceof vi)) throw fs("isEqual", "Query", 1, t);
        return this.firestore === t.firestore && this.pf.isEqual(t.pf);
    }
    withConverter(t) {
        return new vi(this.pf, this.firestore, t);
    }
    /** Helper function to create a bound from a document or fields */    Sf(t, e, s, i) {
        if (ls(t, 1, e), e instanceof gi) {
            if (s.length > 0) throw new m(E.INVALID_ARGUMENT, `Too many arguments provided to ${t}().`);
            const n = e;
            if (!n.exists) throw new m(E.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + `${t}().`);
            return this.Cf(n.Af, i);
        }
        {
            const n = [ e ].concat(s);
            return this.Df(t, n, i);
        }
    }
    /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */    Cf(t, e) {
        const s = [];
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
                for (const e of this.pf.orderBy) if (e.field.Y()) s.push(Y(this.firestore.Zo, t.key)); else {
            const i = t.field(e.field);
            if (O(i)) throw new m(E.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === i) {
                const t = e.field.j();
                throw new m(E.INVALID_ARGUMENT, "Invalid query. You are trying to start or end a query using a " + `document for which the field '${t}' (used as the ` + "orderBy) does not exist.");
            }
            s.push(i);
        }
        return new Ft(s, e);
    }
    /**
     * Converts a list of field values to a Bound for the given query.
     */    Df(t, e, s) {
        // Use explicit order by's because it has to match the query the user made
        const i = this.pf.Mt;
        if (e.length > i.length) throw new m(E.INVALID_ARGUMENT, `Too many arguments provided to ${t}(). ` + "The number of arguments must be less than or equal to the number of Query.orderBy() clauses");
        const n = [];
        for (let s = 0; s < e.length; s++) {
            const r = e[s];
            if (i[s].field.Y()) {
                if ("string" != typeof r) throw new m(E.INVALID_ARGUMENT, "Invalid query. Expected a string for document ID in " + `${t}(), but got a ${typeof r}`);
                if (!this.pf.le() && -1 !== r.indexOf("/")) throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), " + `the value passed to ${t}() must be a plain document ID, but ` + `'${r}' contains a slash.`);
                const e = this.pf.path.child(b.G(r));
                if (!C.et(e)) throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying a collection group and ordering by " + `FieldPath.documentId(), the value passed to ${t}() must result in a ` + `valid document path, but '${e}' is not because it contains an odd number ` + "of segments.");
                const s = new C(e);
                n.push(Y(this.firestore.Zo, s));
            } else {
                const e = this.firestore.nf.Jo(t, r);
                n.push(e);
            }
        }
        return new Ft(n, s);
    }
    onSnapshot(...t) {
        es("Query.onSnapshot", arguments, 1, 4);
        let e, s = {}, i = 0;
        return "object" != typeof t[i] || Ei(t[i]) || (s = t[i], _s("Query.onSnapshot", s, [ "includeMetadataChanges" ]), 
        rs("Query.onSnapshot", "boolean", "includeMetadataChanges", s.includeMetadataChanges), 
        i++), Ei(t[i]) ? e = t[i] : (ss("Query.onSnapshot", "function", i, t[i]), is("Query.onSnapshot", "function", i + 1, t[i + 1]), 
        is("Query.onSnapshot", "function", i + 2, t[i + 2]), e = {
            next: t[i],
            error: t[i + 1],
            complete: t[i + 2]
        }), this.Ff(this.pf), this.If(s, e);
    }
    If(t, e) {
        let s = t => {
            console.error("Uncaught Error in onSnapshot:", t);
        };
        e.error && (s = e.error.bind(e));
        const i = new wi({
            next: t => {
                e.next && e.next(new Si(this.firestore, this.pf, t, this.Tf));
            },
            error: s
        }), n = this.firestore.X_(), r = n.listen(this.pf, i, t);
        return () => {
            i.x_(), n.pu(r);
        };
    }
    Ff(t) {
        if (t.ae() && 0 === t.Mt.length) throw new m(E.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }
    get(t) {
        return es("Query.get", arguments, 0, 1), Ni("Query.get", t), this.Ff(this.pf), new Promise((e, s) => {
            t && "cache" === t.source ? this.firestore.X_().q_(this.pf).then(t => {
                e(new Si(this.firestore, this.pf, t, this.Tf));
            }, s) : this.Rf(e, s, t);
        });
    }
    Rf(t, e, s) {
        const i = this.If({
            includeMetadataChanges: !0,
            Il: !0
        }, {
            next: n => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                i(), n.metadata.fromCache && s && "server" === s.source ? e(new m(E.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : t(n);
            },
            error: e
        });
    }
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */    gf(t) {
        if ("string" == typeof t) {
            if ("" === t) throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!this.pf.le() && -1 !== t.indexOf("/")) throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but " + `'${t}' contains a '/' character.`);
            const e = this.pf.path.child(b.G(t));
            if (!C.et(e)) throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, " + `but '${e}' is not because it has an odd number of segments (${e.length}).`);
            return Y(this.firestore.Zo, new C(e));
        }
        if (t instanceof pi) {
            const e = t;
            return Y(this.firestore.Zo, e.ta);
        }
        throw new m(E.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + `${cs(t)}.`);
    }
    /**
     * Validates that the value passed into a disjunctrive filter satisfies all
     * array requirements.
     */    yf(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new m(E.INVALID_ARGUMENT, "Invalid Query. A non-empty array is required for " + `'${e.toString()}' filters.`);
        if (t.length > 10) throw new m(E.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a ` + "maximum of 10 elements in the value array.");
        if (t.indexOf(null) >= 0) throw new m(E.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters cannot contain 'null' ` + "in the value array.");
        if (t.filter(t => Number.isNaN(t)).length > 0) throw new m(E.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters cannot contain 'NaN' ` + "in the value array.");
    }
    bf(t) {
        if (t instanceof gt) {
            const e = [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], s = [ "in" /* IN */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ ], i = e.indexOf(t.op) >= 0, n = s.indexOf(t.op) >= 0;
            if (t.ue()) {
                const e = this.pf.jt();
                if (null !== e && !e.isEqual(t.field)) throw new m(E.INVALID_ARGUMENT, "Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have" + ` inequality filters on '${e.toString()}'` + ` and '${t.field.toString()}'`);
                const s = this.pf.Gt();
                null !== s && this.Nf(t.field, s);
            } else if (n || i) {
                // You can have at most 1 disjunctive filter and 1 array filter. Check if
                // the new filter conflicts with an existing one.
                let r = null;
                if (n && (r = this.pf.ce(s)), null === r && i && (r = this.pf.ce(e)), null != r) 
                // We special case when it's a duplicate op to give a slightly clearer error message.
                throw r === t.op ? new m(E.INVALID_ARGUMENT, "Invalid query. You cannot use more than one " + `'${t.op.toString()}' filter.`) : new m(E.INVALID_ARGUMENT, `Invalid query. You cannot use '${t.op.toString()}' filters ` + `with '${r.toString()}' filters.`);
            }
        }
    }
    vf(t) {
        if (null === this.pf.Gt()) {
            // This is the first order by. It must match any inequality.
            const e = this.pf.jt();
            null !== e && this.Nf(e, t.field);
        }
    }
    Nf(t, e) {
        if (!e.isEqual(t)) throw new m(E.INVALID_ARGUMENT, "Invalid query. You have a where filter with an inequality " + `(<, <=, >, or >=) on field '${t.toString()}' ` + `and so you must also use '${t.toString()}' ` + "as your first Query.orderBy(), but your first Query.orderBy() " + `is on field '${e.toString()}' instead.`);
    }
}

class Si {
    constructor(t, e, s, i) {
        this.ff = t, this.$f = e, this.Lf = s, this.Tf = i, this.kf = null, this.Of = null, 
        this.metadata = new yi(s.hasPendingWrites, s.fromCache);
    }
    get docs() {
        const t = [];
        return this.forEach(e => t.push(e)), t;
    }
    get empty() {
        return this.Lf.docs.M();
    }
    get size() {
        return this.Lf.docs.size;
    }
    forEach(t, e) {
        es("QuerySnapshot.forEach", arguments, 1, 2), ss("QuerySnapshot.forEach", "function", 1, t), 
        this.Lf.docs.forEach(s => {
            t.call(e, this.qf(s));
        });
    }
    get query() {
        return new vi(this.$f, this.ff, this.Tf);
    }
    docChanges(t) {
        t && (_s("QuerySnapshot.docChanges", t, [ "includeMetadataChanges" ]), rs("QuerySnapshot.docChanges", "boolean", "includeMetadataChanges", t.includeMetadataChanges));
        const e = !(!t || !t.includeMetadataChanges);
        if (e && this.Lf.hs) throw new m(E.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this.kf && this.Of === e || (this.kf = 
        /**
 * Calculates the array of firestore.DocumentChange's for a given ViewSnapshot.
 *
 * Exported for testing.
 */
        function(t, e, s, i) {
            if (s.ss.M()) {
                // Special case the first snapshot because index calculation is easy and
                // fast
                let e, n = 0;
                return s.docChanges.map(r => {
                    const h = new bi(t, r.doc.key, r.doc, s.fromCache, s.ns.has(r.doc.key), i);
                    return e = r.doc, {
                        type: "added",
                        doc: h,
                        oldIndex: -1,
                        newIndex: n++
                    };
                });
            }
            {
                // A DocumentSet that is updated incrementally as changes are applied to use
                // to lookup the index of a document.
                let n = s.ss;
                return s.docChanges.filter(t => e || 3 /* Metadata */ !== t.type).map(e => {
                    const r = new bi(t, e.doc.key, e.doc, s.fromCache, s.ns.has(e.doc.key), i);
                    let h = -1, o = -1;
                    return 0 /* Added */ !== e.type && (h = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 
                    1 /* Removed */ !== e.type && (n = n.add(e.doc), o = n.indexOf(e.doc.key)), {
                        type: Li(e.type),
                        doc: r,
                        oldIndex: h,
                        newIndex: o
                    };
                });
            }
        }(this.ff, e, this.Lf, this.Tf), this.Of = e), this.kf;
    }
    /** Check the equality. The call can be very expensive. */    isEqual(t) {
        if (!(t instanceof Si)) throw fs("isEqual", "QuerySnapshot", 1, t);
        return this.ff === t.ff && this.$f.isEqual(t.$f) && this.Lf.isEqual(t.Lf) && this.Tf === t.Tf;
    }
    qf(t) {
        return new bi(this.ff, t.key, t, this.metadata.fromCache, this.Lf.ns.has(t.key), this.Tf);
    }
}

class Ci extends vi {
    constructor(t, e, s) {
        if (super(yt.Wt(t), e, s), this.Mf = t, t.length % 2 != 1) throw new m(E.INVALID_ARGUMENT, "Invalid collection reference. Collection references must have an odd number of segments, but " + `${t.j()} has ${t.length}`);
    }
    get id() {
        return this.pf.path.q();
    }
    get parent() {
        const t = this.pf.path.k();
        return t.M() ? null : new pi(new C(t), this.firestore);
    }
    get path() {
        return this.pf.path.j();
    }
    doc(t) {
        if (es("CollectionReference.doc", arguments, 0, 1), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        0 === arguments.length && (t = ve.cn()), ss("CollectionReference.doc", "non-empty string", 1, t), 
        "" === t) throw new m(E.INVALID_ARGUMENT, "Document path must be a non-empty string");
        const e = b.G(t);
        return pi.lf(this.pf.path.child(e), this.firestore, this.Tf);
    }
    add(t) {
        Ze("CollectionReference.add", arguments, 1), ss("CollectionReference.add", "object", 1, this.Tf ? this.Tf.toFirestore(t) : t);
        const e = this.doc();
        return e.set(t).then(() => e);
    }
    withConverter(t) {
        return new Ci(this.Mf, this.firestore, t);
    }
}

function Di(t, e) {
    if (void 0 === e) return {
        merge: !1
    };
    if (_s(t, e, [ "merge", "mergeFields" ]), rs(t, "boolean", "merge", e.merge), hs(t, "mergeFields", "a string or a FieldPath", e.mergeFields, t => "string" == typeof t || t instanceof Rs), 
    void 0 !== e.mergeFields && void 0 !== e.merge) throw new m(E.INVALID_ARGUMENT, `Invalid options passed to function ${t}(): You cannot specify both "merge" ` + 'and "mergeFields".');
    return e;
}

function Fi(t, e) {
    return void 0 === e ? {} : (_s(t, e, [ "serverTimestamps" ]), os(t, 0, "serverTimestamps", e.serverTimestamps, [ "estimate", "previous", "none" ]), 
    e);
}

function Ni(t, e) {
    is(t, "object", 1, e), e && (_s(t, e, [ "source" ]), os(t, 0, "source", e.source, [ "default", "server", "cache" ]));
}

function $i(t, e, s) {
    if (e instanceof pi) {
        if (e.firestore !== s) throw new m(E.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return e;
    }
    throw fs(t, "DocumentReference", 1, e);
}

function Li(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return ye();
    }
}

/**
 * Converts custom model object of type T into DocumentData by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to DocumentData
 * because we want to provide the user with a more specific error message if
 * their set() or fails due to invalid data originating from a toFirestore()
 * call.
 */ function ki(t, e, s) {
    let i;
    return t ? (i = t.toFirestore(e), s = "toFirestore() in " + s) : i = e, [ i, s ];
}

function Oi(t, e) {
    function s() {
        let t = "This constructor is private.";
        throw e && (t += " ", t += e), new m(E.INVALID_ARGUMENT, t);
    }
    // Make sure instanceof checks work and all methods are exposed on the public
    // constructor
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return s.prototype = t.prototype, 
    // Copy any static methods/members
    Object.assign(s, t), s;
}

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
// Public instance that disallows construction at runtime. Note that this still
// allows instanceof checks.
const qi = Oi(Ai, "Use firebase.firestore() instead."), Mi = Oi(Pi, "Use firebase.firestore().runTransaction() instead."), xi = Oi(Vi, "Use firebase.firestore().batch() instead."), Bi = Oi(pi, "Use firebase.firestore().doc() instead."), Ui = Oi(gi), Qi = Oi(bi), Wi = Oi(vi), ji = Oi(Si), Gi = Oi(Ci, "Use firebase.firestore().collection() instead."), Hi = Oi(class {
    static delete() {
        return Je("FieldValue.delete", arguments), new Vs;
    }
    static serverTimestamp() {
        return Je("FieldValue.serverTimestamp", arguments), new ps;
    }
    static arrayUnion(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
        return ts("FieldValue.arrayUnion", arguments, 1), new ys(t);
    }
    static arrayRemove(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we need access to the Firestore instance.
        return ts("FieldValue.arrayRemove", arguments, 1), new gs(t);
    }
    static increment(t) {
        return ss("FieldValue.increment", "number", 1, t), Ze("FieldValue.increment", arguments, 1), 
        new bs(t);
    }
    isEqual(t) {
        return this === t;
    }
}, "Use FieldValue.<field>() instead."), Ki = Oi(Is, "Use Blob.fromUint8Array() or Blob.fromBase64String() instead."), zi = {
    Firestore: qi,
    GeoPoint: vs,
    Timestamp: p,
    Blob: Ki,
    Transaction: Mi,
    WriteBatch: xi,
    DocumentReference: Bi,
    DocumentSnapshot: Ui,
    Query: Wi,
    QueryDocumentSnapshot: Qi,
    QuerySnapshot: ji,
    CollectionReference: Gi,
    FieldPath: Rs,
    FieldValue: Hi,
    setLogLevel: Ai.setLogLevel,
    CACHE_SIZE_UNLIMITED: Ii
};

/**
 * @license
 * Copyright 2019 Google Inc.
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
class Yi {
    nu(t) {
        // No-op.
    }
    Pu() {
        // No-op.
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
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
// References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Browser implementation of ConnectivityMonitor.
 */
class Xi {
    constructor() {
        this.xf = () => this.Bf(), this.Uf = () => this.Qf(), this.Wf = [], this.jf();
    }
    nu(t) {
        this.Wf.push(t);
    }
    Pu() {
        window.removeEventListener("online", this.xf), window.removeEventListener("offline", this.Uf);
    }
    jf() {
        window.addEventListener("online", this.xf), window.addEventListener("offline", this.Uf);
    }
    Bf() {
        Pe("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t of this.Wf) t(0 /* AVAILABLE */);
    }
    Qf() {
        Pe("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t of this.Wf) t(1 /* UNAVAILABLE */);
    }
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    static Gf() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
    }
}

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
/**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */ class Ji {
    constructor(t) {
        this.Hf = t.Hf, this.Kf = t.Kf;
    }
    Ra(t) {
        this.zf = t;
    }
    Ta(t) {
        this.Yf = t;
    }
    onMessage(t) {
        this.Xf = t;
    }
    close() {
        this.Kf();
    }
    send(t) {
        this.Hf(t);
    }
    Jf() {
        this.zf();
    }
    Zf(t) {
        this.Yf(t);
    }
    td(t) {
        this.Xf(t);
    }
}

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
 */ const Zi = {
    BatchGetDocuments: "batchGet",
    Commit: "commit"
}, tn = "gl-js/ fire/" + T;

class en {
    constructor(t) {
        this.ii = t.ii;
        const e = t.ssl ? "https" : "http";
        this.ed = e + "://" + t.host, this.forceLongPolling = t.forceLongPolling;
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    sd(t, e) {
        if (e) for (const s in e.o) e.o.hasOwnProperty(s) && (t[s] = e.o[s]);
        t["X-Goog-Api-Client"] = tn;
    }
    Fa(t, e, s) {
        const i = this.nd(t);
        return new Promise((n, r) => {
            const h = new c;
            h.listenOnce(l.COMPLETE, () => {
                try {
                    switch (h.getLastErrorCode()) {
                      case _.NO_ERROR:
                        const e = h.getResponseJson();
                        Pe("Connection", "XHR received:", JSON.stringify(e)), n(e);
                        break;

                      case _.TIMEOUT:
                        Pe("Connection", 'RPC "' + t + '" timed out'), r(new m(E.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case _.HTTP_ERROR:
                        const s = h.getStatus();
                        if (Pe("Connection", 'RPC "' + t + '" failed with status:', s, "response text:", h.getResponseText()), 
                        s > 0) {
                            const t = h.getResponseJson().error;
                            if (t && t.status && t.message) {
                                const e = function(t) {
                                    const e = t.toLowerCase().replace("_", "-");
                                    return Object.values(E).indexOf(e) >= 0 ? e : E.UNKNOWN;
                                }(t.status);
                                r(new m(e, t.message));
                            } else r(new m(E.UNKNOWN, "Server responded with status " + h.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        Pe("Connection", 'RPC "' + t + '" failed'), r(new m(E.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        ye();
                    }
                } finally {
                    Pe("Connection", 'RPC "' + t + '" completed.');
                }
            });
            // The database field is already encoded in URL. Specifying it again in
            // the body is not necessary in production, and will cause duplicate field
            // errors in the Firestore Emulator. Let's remove it.
            const o = Object.assign({}, e);
            delete o.database;
            const a = JSON.stringify(o);
            Pe("Connection", "XHR sending: ", i + " " + a);
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the
            // $httpOverwrite parameter supported by ESF to avoid
            // triggering preflight requests.
            const u = {
                "Content-Type": "text/plain"
            };
            this.sd(u, s), h.send(i, "POST", a, u, 15);
        });
    }
    Na(t, e, s) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.Fa(t, e, s);
    }
    Aa(t, e) {
        const s = [ this.ed, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], u = f(), c = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: `projects/${this.ii.projectId}/databases/${this.ii.database}`
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling
        };
        this.sd(c.initMessageHeaders, e), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        i() || n() || r() || h() || o() || a() || (c.httpHeadersOverwriteParam = "$httpHeaders");
        const l = s.join("");
        Pe("Connection", "Creating WebChannel: " + l + " " + c);
        const _ = u.createWebChannel(l, c);
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                let T = !1, w = !1;
        // A flag to determine whether the stream was closed (by us or through an
        // error/close event) to avoid delivering multiple close events or sending
        // on a closed stream
                const I = new Ji({
            Hf: t => {
                w ? Pe("Connection", "Not sending because WebChannel is closed:", t) : (T || (Pe("Connection", "Opening WebChannel transport."), 
                _.open(), T = !0), Pe("Connection", "WebChannel sending:", t), _.send(t));
            },
            Kf: () => _.close()
        }), R = (t, e) => {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            _.listen(t, t => {
                try {
                    e(t);
                } catch (t) {
                    setTimeout(() => {
                        throw t;
                    }, 0);
                }
            });
        };
        // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
                return R(d.EventType.OPEN, () => {
            w || Pe("Connection", "WebChannel transport opened.");
        }), R(d.EventType.CLOSE, () => {
            w || (w = !0, Pe("Connection", "WebChannel transport closed"), I.Zf());
        }), R(d.EventType.ERROR, t => {
            w || (w = !0, Pe("Connection", "WebChannel transport errored:", t), I.Zf(new m(E.UNAVAILABLE, "The operation could not be completed")));
        }), R(d.EventType.MESSAGE, t => {
            var e;
            if (!w) {
                const s = t.data[0];
                ge(!!s);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                const i = s, n = i.error || (null === (e = i[0]) || void 0 === e ? void 0 : e.error);
                if (n) {
                    Pe("Connection", "WebChannel received error:", n);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    const t = n.status;
                    let e = function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const e = kt[t];
                        if (void 0 !== e) return Mt(e);
                    }(t), s = n.message;
                    void 0 === e && (e = E.INTERNAL, s = "Unknown error status: " + t + " with message " + n.message), 
                    // Mark closed so no further events are propagated
                    w = !0, I.Zf(new m(e, s)), _.close();
                } else Pe("Connection", "WebChannel received:", s), I.td(s);
            }
        }), setTimeout(() => {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            I.Jf();
        }, 0), I;
    }
    // visible for testing
    nd(t) {
        const e = Zi[t];
        return this.ed + "/v1/projects/" + this.ii.projectId + "/databases/" + this.ii.database + "/documents:" + e;
    }
}

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
// Implements the Platform API for browsers and some browser-like environments
// (including ReactNative).
/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * This code needs to run before Firestore is used. This can be achieved in
 * several ways:
 *   1) Through the JSCompiler compiling this code and then (automatically)
 *      executing it before exporting the Firestore symbols.
 *   2) Through importing this module first in a Firestore main module
 */
me.an(new class {
    constructor() {
        this.bo = "undefined" != typeof atob;
    }
    get document() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
    }
    get window() {
        // `window` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof window ? window : null;
    }
    C_(t) {
        return Promise.resolve(new en(t));
    }
    g_() {
        return Xi.Gf() ? new Xi : new Yi;
    }
    Go(t) {
        return new we(t, {
            hi: !0
        });
    }
    un(t) {
        return JSON.stringify(t);
    }
    atob(t) {
        return atob(t);
    }
    btoa(t) {
        return btoa(t);
    }
    ln(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), s = new Uint8Array(t);
        if (e) e.getRandomValues(s); else 
        // Falls back to Math.random
        for (let e = 0; e < t; e++) s[e] = Math.floor(256 * Math.random());
        return s;
    }
});

/**
 * @license
 * Copyright 2020 Google LLC
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
/**
 * Registers the memory-only Firestore build with the components framework.
 */
function sn(t) {
    !
    /**
 * Configures Firestore as part of the Firebase SDK by calling registerService.
 *
 * @param firebase The FirebaseNamespace to register Firestore with
 * @param firestoreFactory A factory function that returns a new Firestore
 *    instance.
 */
    function(t, e) {
        t.INTERNAL.registerComponent(new u("firestore", t => {
            const s = t.getProvider("app").getImmediate();
            return e(s, t.getProvider("auth-internal"));
        }, "PUBLIC" /* PUBLIC */).setServiceProps(Object.assign({}, zi)));
    }(t, (t, e) => new Ai(t, e, new di)), t.registerVersion("@firebase/firestore", "1.14.4");
}

sn(t);

export { sn as __PRIVATE_registerFirestore };
//# sourceMappingURL=index.memory.esm2017.js.map
