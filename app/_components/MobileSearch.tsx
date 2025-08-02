import SearchInput from "./SearchInput";
import SearchInputCopy from "./SearchInput copy";
import { Dialog, DialogContent } from "./ui/dialog";
import { Search } from "lucide-react";

export default function MobileSearch() {
    return (
        <SearchInputCopy>
            <Search />
        </SearchInputCopy>
    );
}
