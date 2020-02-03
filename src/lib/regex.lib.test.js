import { escapeRegExp, createSearchRegex } from "./regex.lib";

describe('RegexLib', () => {
    test('#escapeRegExp escapes regex special characters', () => {
        expect(escapeRegExp('[.*+?^${}()|[\]\\]'))
            .toEqual('\\[\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\]');
    });

    test('#createSearchRegex creates a regext to find all matching names', () => {
        expect(createSearchRegex('moh$en* n'))
            .toEqual(/m.*o.*h.*\$.*e.*n.*\*.* .*n/);
    } );
});