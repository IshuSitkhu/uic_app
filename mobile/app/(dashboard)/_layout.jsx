import { Stack } from "expo-router";


export default function DashboardLayout() {
    return (
        
        <Stack>
            <Stack.Screen  name="(tabs)"  options={{ headerShown: false, }}/>
            <Stack.Screen  name="blogs"  options={{ headerShown: false, }}/>
            <Stack.Screen  name="blog-detail"  options={{ headerShown: false, }}/>

            <Stack.Screen  name="prayer-detail"  options={{ headerShown: false, }}/>
            <Stack.Screen  name="add-blog"  options={{ headerShown: false, }}/>
            <Stack.Screen  name="settings"  options={{ headerShown: false, }}/>
            <Stack.Screen name="edit-profile"   options={{ headerShown: false,  }}/>
            <Stack.Screen name="saved-bible"   options={{ headerShown: false,  }}/>
            <Stack.Screen name="highlight-bible"   options={{ headerShown: false,  }}/>
        </Stack>

    );
}