<template>
    <!-- <el-upload ref="upload" class="upload-demo" action="/api/upload" :limit="1" :on-exceed="handleExceed"
        :auto-upload="false">
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
        </el-button>
        <template #tip>
            <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
            </div>
        </template>
    </el-upload> -->
    <form action="/api/fileUpload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" id="">
        <br />
        <input type="submit" value="上传文件" />
    </form>
    <!-- <img src="C:\Users\Lenovo\Desktop\毕设\webserver\public\1.png" alt=""> -->
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
}
</script>
  